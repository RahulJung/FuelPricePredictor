import React from "react";
import Axios from "axios";
import Login from "./Login.jsx";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      newPassword: "",
      isLoggedin: false,
    };
    this.handleLoggedin = this.handleLoggedin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios.post("/register", {
      name: this.state.name,
      password: this.state.password,
    })
      .then((res) => {
        console.log("User Registeres");
      })
      .then(() => {
        this.setState({
          name: "",
          password: "",
          newPassword: "",
        });
      })
      .catch((err) => {
        console.log("Error Registering user");
      });
  }

  handleLoggedin(e) {
    e.preventDefault();
    this.setState({
      isLoggedin: true,
    });
  }

  render() {
    if (!this.state.isLoggedin) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="submit"></input>
            <button onClick={this.handleLoggedin}>Login</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <Login />
        </div>
      );
    }
  }
}

export default Register;
