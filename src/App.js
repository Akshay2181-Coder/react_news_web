import './App.css';
import React, {Component} from 'react';
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import LoadingBar from "react-top-loading-bar";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

export  default  class App extends Component {
    pageSize = 20;
    apikey = process.env.REACT_APP_NEWS_API_KEY;

    state = {
        progress:0
    }

    setProgress = (value) => {
        this.setState({
            progress: value
        })
    }

  render() {
    return (
        <>
            <Router>
                <NavBar/>
                <div>
                    <LoadingBar color="#f11946" progress={this.state.progress} height={3}/>
                    <Routes>
                        <Route exact path="/"
                               element={<News  setProgress={this.setProgress} key='general' pageSize={this.pageSize} apikey={this.apikey} country='in' category='general'/>}/>
                        <Route exact path="/business"
                               element={<News  setProgress={this.setProgress} key='business' pageSize={this.pageSize} apikey={this.apikey} country='in' category='business'/>}/>
                        <Route exact path="/entertainment" element={<News  setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} apikey={this.apikey} country='in'
                                                                          category='entertainment'/>}/>
                        <Route exact path="/general"
                               element={<News  setProgress={this.setProgress} key='general' pageSize={this.pageSize} apikey={this.apikey} country='in' category='general'/>}/>
                        <Route exact path="/health"
                               element={<News  setProgress={this.setProgress} key='health' pageSize={this.pageSize} apikey={this.apikey} country='in' category='health'/>}/>
                        <Route exact path="/science"
                               element={<News  setProgress={this.setProgress} key='science' pageSize={this.pageSize} apikey={this.apikey} country='in' category='science'/>}/>
                        <Route exact path="/sports"
                               element={<News  setProgress={this.setProgress} key='sports' pageSize={this.pageSize} apikey={this.apikey} country='in' category='sports'/>}/>
                        <Route exact path="/technology"
                               element={<News  setProgress={this.setProgress} key='technology' pageSize={this.pageSize} apikey={this.apikey} country='in' category='technology'/>}/>
                    </Routes>
                </div>
                {/*<ScrollToTop/>*/}
            </Router>
        </>
    );
  }
}