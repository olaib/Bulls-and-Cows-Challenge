package hac.javareact;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Objects;

/***
 * Highscore class for storing the highscores in the file,
 * its serializable so it can be written to the file and read from the file
 * it also implements the writeObject and readObject methods so that the score and username can be written and read from the file.
 * @see Serializable
 */
public class Highscore implements Serializable, Comparable<Highscore> {
    /***
     * serialVersionUID is used to verify that the sender and receiver of a serialized object have loaded classes for that object that are compatible with respect to serialization.
     */
    private static final long serialVersionUID = 1L;
    /***
     * username of the player
     */
    private String username;
    /***
     * score of the player
     */
    private int score;

    /***
     * default constructor
     */
    public Highscore() {
        this.username = "";
        this.score = 0;
    }

    /***
     * constructor
     * @param username username of the player
     * @param score score of the player
     */
    public Highscore(String username, int score) {
        this.username = username;
        this.score = score;
    }

    /***
     * getter for username
     * @return username
     */
    public String getUsername() {
        return username;
    }

    /***
     * setter for username
     * @param username username of the player
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /***
     * setter for score
     * @param score score of the player
     */
    public void setScore(int score) {
        this.score = score;
    }

    /***
     * getter for score
     * @return score
     */
    public int getScore() {
        return score;
    }

    /***
     * writeObject method is used to write the score and username to the file
     * @param out ObjectOutputStream to write the score and username to the file
     * @throws IOException if an I/O error occurs while writing stream header
     */
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();
        out.writeObject(username);
        out.writeObject(score);
    }

    /***
     * readObject method is used to read the score and username from the file
     * @param ois ObjectInputStream to read the score and username from the file
     * @throws IOException if an I/O error occurs while reading stream header
     * @throws ClassNotFoundException if the class of a serialized object cannot be found
     */
    private void readObject(java.io.ObjectInputStream ois) throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        this.username = (String) ois.readObject();
        this.score = (int) ois.readObject();
    }

    /***
     * compareTo method is used to compare the scores of the players
     * @param other other Highscore object to compare the score with
     * @return 0 if the scores are equal, 1 if the score of the other object is greater than this object, -1 if the score of the other object is less than this object
     */
    public int compareTo(Highscore other) {
        return Integer.compare(this.score, other.score);
    }
    /***
     * equals method is used to compare the objects
     * @param obj other object to compare with
     * @return true if the objects are equal, false if the objects are not equal
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof Highscore)) {
            return false;
        }
        Highscore other = (Highscore) obj;
        return Objects.equals(this.username, other.username);
    }
    /***
     * hashCode method is used to generate a hashcode for the object
     * @return hashcode of the object
     */
    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

    /***
     * toString method is used to convert the object to string
     * @return string representation of the object as json
     */
    @Override
    public String toString() {
        return "{\"username\": \"" + username + "\", \"score\": " + score + "}";
    }
}
