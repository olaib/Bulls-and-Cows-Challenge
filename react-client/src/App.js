import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Game from './components/Game';
import backgroundImg from './assets/img/background.jpg';

const styles = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100vw',
};

function App() {
    return (
        <div className="App" style={styles}>
            <Game />
        </div>
    );
}

export default App;
