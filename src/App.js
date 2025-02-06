import './App.css';
import React, { useState } from 'react';
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    const pageSize = 20;
    const apikey = process.env.REACT_APP_NEWS_API_KEY;

    const [progress, setProgress] = useState(0);

    return (
        <>
            <Router>
                <NavBar />
                <div>
                    <LoadingBar color="#f11946" progress={progress} height={3} />
                    <Routes>
                        <Route exact path="/" element={<News setProgress={setProgress} key='general' pageSize={pageSize} apikey={apikey} country='in' category='general' />} />
                        <Route exact path="/business" element={<News setProgress={setProgress} key='business' pageSize={pageSize} apikey={apikey} country='in' category='business' />} />
                        <Route exact path="/entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} apikey={apikey} country='in' category='entertainment' />} />
                        <Route exact path="/general" element={<News setProgress={setProgress} key='general' pageSize={pageSize} apikey={apikey} country='in' category='general' />} />
                        <Route exact path="/health" element={<News setProgress={setProgress} key='health' pageSize={pageSize} apikey={apikey} country='in' category='health' />} />
                        <Route exact path="/science" element={<News setProgress={setProgress} key='science' pageSize={pageSize} apikey={apikey} country='in' category='science' />} />
                        <Route exact path="/sports" element={<News setProgress={setProgress} key='sports' pageSize={pageSize} apikey={apikey} country='in' category='sports' />} />
                        <Route exact path="/technology" element={<News setProgress={setProgress} key='technology' pageSize={pageSize} apikey={apikey} country='in' category='technology' />} />
                    </Routes>
                </div>
                {/*<ScrollToTop/>*/}
            </Router>
        </>
    );
}

export default App;
