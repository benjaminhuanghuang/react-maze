import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
//
import Header from "./Header";
import Maze from "./Maze";
import MazeCanvas from "./MazeCanvas";

class App extends Component {
  render() {
    return (
      <div className="container">
      <BrowserRouter>
       <div>
         <Header/>
         <Route exact path="/" component={Maze}/>
         <Route exact path="/mazecanvas" component={MazeCanvas}/>
       </div>
      </BrowserRouter>
     </div>
    );
  }
}

export default App;
