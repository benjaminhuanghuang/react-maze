import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
        <nav>
          <div className="nav-wrapper">
            <label className="brand-logo">React Maze</label>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/">Maze Div</Link></li>
              <li><Link to="/mazecanvas">Maze Canvas</Link></li>
            </ul>
          </div>
        </nav>
    );
  }
}
