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
      data: [],
      loggedIn: false,
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
        this.setState({
          data: res.data.data,
          loggedIn: res.data.logged,
        });
      })
      .catch((err) => {
        console.log("Error Logging user");
      });
  }

  render() {
    console.log(this.state);
    if (!this.state.isRegistered && !this.state.loggedIn) {
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
            <button>Login</button>
            <button onClick={this.handleRegister}>Register</button>
          </form>
        </div>
      );
    }
    if (this.state.loggedIn) {
      return (
        <div>
          <Profile />
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
