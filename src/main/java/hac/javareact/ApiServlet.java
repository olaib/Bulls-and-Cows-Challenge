package hac.javareact;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.*;
import java.util.*;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/***
 * ApiServlet class for handling the requests from the client
 * it handles the GET and POST requests from the client ,
 * this Servlet is responsible for reading and writing the highscores to the file
 */
@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    /***
     * The lock for reading and writing to the file safely (race condition prevention)
     */
    private static ReadWriteLock lock = new ReentrantReadWriteLock();
    /***
     * The logger of the class
     */
    private static Logger logger = Logger.getLogger(ApiServlet.class.getName());
    /***
     * The name of the file that contains the highscores
     */
    private static final String SCORES = "scores.dat";
    /***
     * The top highscores that will be returned to the client
     */
    private static final int MAX_HIGHSCORES = 5;
    /***
     * The message that will be returned to the client if the request is invalid
     */
    private static final String BAD_REQUEST = "Bad request - invalid/missing parameters - must provide username and score";
    /***
     * The file that contains the highscores
     */
    private static String NAME_REGEX = "^[a-zA-Z0-9_]{3,15}$";
    private static File file;
    /***
     * msg that will be returned to the client if the username is invalid
     */
    private static final String INVALID_USERNAME = "Invalid username - must contain only letters, numbers and underscores and be between 3 and 15 characters long",
    /***
     * msg that will be returned to the client if the score is invalid
     */
    INVALID_SCORE = "Invalid score - must be a positive number ";

    private Boolean isValidName(String name) {
        return name != null && name.matches(NAME_REGEX);
    }

    /***
     * This method records a new highscore if its not exist in the highscores list
     * if the highscore is already exist in the list it updates the score of the player's score if its higher
     * @param highscore the highscore to record
     * @param highscores the list of the highscores
     */
    private void recordHighScore(Highscore highscore, HashSet<Highscore> highscores) {
        try {
            lock.writeLock().lock(); // acquire the write lock
            // if the highscore is already exist in the list
            if (highscores.contains(highscore)) {
                highscores.remove(highscore);
                highscores.add(highscore);
            }
            // if not exist in the list - add it
            else {
                highscores.add(highscore);
            }
        } finally {
            lock.writeLock().unlock(); // release the write lock
        }
    }

    /***
     * This method reads the highscores from the file
     * @return the highscores list
     * @throws RuntimeException if there is an error reading from the file
     */
    private HashSet<Highscore> readFromFile() throws RuntimeException {
        lock.readLock().lock(); // acquire the read lock
        HashSet<Highscore> highscores = new HashSet<>();
        try (FileInputStream fileInputStream = new FileInputStream(file);
             ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {
            highscores = (HashSet<Highscore>) objectInputStream.readObject();
        } catch (EOFException e) {
            //do nothing
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException("Error reading from file");
        } finally {
            lock.readLock().unlock(); // release the read lock
        }
        return highscores;
    }

    /***
     * This method writes the highscores to the file
     * writing the highscores to the file is done by serialization
     * the writing is done in one shot - the whole list is written to the file after reading it from the file
     * @see <a href="https://www.geeksforgeeks.org/serialization-in-java/">Serialization in Java</a>
     * @param highscore the highscore to write
     * @throws IOException if there is an error writing to the file
     */
    private void write2File(Highscore highscore) throws IOException {
        HashSet<Highscore> highscores = readFromFile();
        recordHighScore(highscore, highscores);
        try (FileOutputStream fileOutputStream = new FileOutputStream(file);
             ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
            objectOutputStream.writeObject(highscores);
        } catch (IOException e) {
            throw new IOException("Error writing to file");
        }
    }

    /***
     * @param request  request from the client with the username and score of the player
     * @param response response to the client with the highscores list
     * @throws IOException for Io operations
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            response.setHeader("Access-Control-Allow-Origin", "*");
            // get the highscores from the file
            HashSet<Highscore> highscores = readFromFile();
            // sort the highscores by the score of the player and limit the list to the top 5 highscores
            ArrayList<Highscore> highscoreList = highscores.stream().sorted()
                    .limit(MAX_HIGHSCORES).collect(Collectors.toCollection(ArrayList::new));
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            // return the highscores list to the client
            response.getWriter().println(new Gson().toJson(highscoreList));
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println("Internal server error: " + e.getMessage());
        }
    }

    /**
     * @param request  request from the client with the username and score of the player
     * @param response response to the client with the message of success or failure
     * @throws IOException for Io operations
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            response.setHeader("Access-Control-Allow-Origin", "*");
            JsonObject json = new JsonParser().parse(request.getReader()).getAsJsonObject();

            Highscore highscore;
            try {
                highscore = new Gson().fromJson(json, Highscore.class);
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().println(BAD_REQUEST);
                return;
            }
            if (!isValidName(highscore.getUsername())) {
                throw new Exception(INVALID_USERNAME);
            }
            if (highscore.getScore() <= 0) {
                throw new Exception(INVALID_SCORE);
            }
            write2File(highscore);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().println("Highscore added successfully");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().println(e.getMessage());
        }
    }

    /***
     * init method for initializing the path of the file to be created
     * The file will be created in the target folder of the project in the WEB-INF/classes/hac/javareact/scores.txt
     */
    @Override
    public void init() {
        String path = getServletContext().getRealPath("/") + File.separator + SCORES;
        file = new File(path);
        createFile();
    }

    /***
     * This method creates the file if its not exist
     * @throws RuntimeException if there is an error creating the file
     */
    private void createFile() throws RuntimeException {
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                throw new RuntimeException(" file creation failed");
            }
        }
    }

    /***
     * This method is called when the servlet is destroyed
     */
    @Override
    public void destroy() {
        logger.info("Servlet destroyed");
    }
}