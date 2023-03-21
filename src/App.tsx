import Header from "./components/Header";
import Plp from "./components/Plp";
import Footer from "./components/Footer";

import "./app.scss";

function App() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <Plp />
            </div>
            <Footer />
        </div>
    );
}

export default App;
