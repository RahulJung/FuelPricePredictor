import React from "react";
import Axios from "axios";
import Login from "./Login.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default App;
