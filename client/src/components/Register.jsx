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
      message: "",
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
    if (this.state.password === this.state.newPassword) {
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
            message: "Login to your profile",
          });
        })
        .catch((err) => {
          console.log("Error Registering user");
        });
    } else {
      this.setState({
        message: "Password did not match",
      });
    }
  }

  handleLoggedin(e) {
    e.preventDefault();
    this.setState({
      isLoggedin: true,
    });
  }

  render() {
    console.log();
    if (!this.state.isLoggedin) {
      return (
        <div>
          <div>{this.state.message}</div>
          <div className="signHeader">
            <div>Already have GetFuel account? </div>
            <div>
              <button className="back" onClick={this.handleLoggedin}>
                Login
              </button>
            </div>
          </div>
          <div className="form1">
            <form onSubmit={this.handleSubmit}>
              <div>
                <h3>Sign Up for GetFuel</h3>
              </div>
              <div className="userName">
                <label>Userame:</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
              <div className="pwd">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="pwd">
                <label>Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button className="reviewBtn" type="submit" value="submit">
                Sign Up & Accept
              </button>
            </form>
          </div>
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
