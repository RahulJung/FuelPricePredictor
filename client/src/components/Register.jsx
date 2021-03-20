import Axios from "axios";
import React from "react";
import Login from "./Login.jsx";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isLoggedin: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleRegister(e) {
    this.setState({
      userName: e.target.value,
      password: e.target.value,
    });
  }

  handleLogin(e) {
    this.setState({
      isLoggedin: true,
    });
  }

  registerUser() {
    Axios.post("http://localhost:8080/register", {
      userName: this.state.userName,
      password: this.state.password,
    })
      .then(() => {
        console.log("User Registered");
      })
      .catch((err) => {
        console.log("Error in user regestration", err);
      });
  }

  render() {
    console.log("this is state", this.state);
    if (!this.state.isLoggedin) {
      return (
        <form onSubmit={this.handleLogin}>
          <div className="form">
            <h2>Register User</h2>
            <div className="innerForm">
              <div className="userName">
                <label>User Name</label>
                <input
                  name="userName"
                  placeholder="Username"
                  value={this.userName}
                  onChange={this.handleRegister}
                />
              </div>
              <div className="pwd">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.password}
                  onChange={this.handleRegister}
                  required
                ></input>
              </div>
              <div className="pwd">
                <label>Confirm Password</label>
                <input
                  type="new-password"
                  name="new-password"
                  placeholder="Re-enter Password"
                  value={this.password}
                  onChange={this.changeHandler}
                  required
                ></input>
                <button type="submit">Register</button>
              </div>

              <button type="button" className="reviewBtn">
                Login
              </button>
            </div>
          </div>
        </form>
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
