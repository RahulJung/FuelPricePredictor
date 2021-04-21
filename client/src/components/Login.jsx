import React from "react";
import Axios from "axios";
import Register from "./Register.jsx";
import Profile from "./Profile.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      isRegistered: false,
      data: 0,
      loggedIn: false,
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      isRegistered: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Axios.post("/login", {
      name: this.state.name,
      password: this.state.password,
    })
      .then((res) => {
        console.log("This is message", res.data.message);
        this.setState({
          data: res.data.data,
          loggedIn: res.data.logged,
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log("Error Logging user");
      });
  }

  render() {
    // console.log("This is data", this.state.data);
    if (!this.state.isRegistered && !this.state.loggedIn) {
      return (
        <div className="main">
          <div className="form">
            <h2>Login to GetFuel</h2>

            <div className="innerForm">
              <form onSubmit={this.handleSubmit}>
                <div className="userName">
                  <label>Username: </label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  ></input>
                </div>
                <div className="pwd">
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <button className="reviewBtn">Login</button>
              </form>
            </div>
          </div>
          <div className="log">
            New to GetFuel?{"    "}
            <button className="back" onClick={this.handleRegister}>
              Sign Up
            </button>
          </div>
          <div className="message">{this.state.message}</div>
        </div>
      );
    }
    if (this.state.loggedIn) {
      return (
        <div>
          <Profile id={this.state.data} />
        </div>
      );
    } else {
      return (
        <div>
          <Register />
        </div>
      );
    }
  }
}

export default Login;
