import Axios from "axios";
import e from "cors";
import React from "react";
import Register from "./Register.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isRegistered: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleLogin(e) {
    this.setState({
      userName: e.target.value,
      password: e.target.value,
    });
  }

  handleRegister(e) {
    this.setState({
      isRegistered: true,
    });
  }

  getUser(e) {
    e.preventDefault();
    Axios.post("/login", {
      userName: this.state.userName,
      password: this.state.userName,
    })
      .then((res) => {
        console.log("Logged In");
      })
      .catch((err) => {
        console.log("Error loggin user");
      });
  }

  render() {
    console.log("state", this.state);
    if (!this.state.isRegistered) {
      return (
        <form>
          <div className="form">
            <h2>User Login</h2>
            <div className="innerForm">
              <div className="userName">
                <label>User Name</label>
                <input
                  name="userName"
                  placeholder="Username"
                  value={this.userName}
                  onChange={this.handleLogin}
                  required
                />
              </div>
              <div className="pwd">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.password}
                  onChange={this.handleLogin}
                  required
                ></input>
                <button onClick={this.getUser}>Login</button>
              </div>
              <button className="reviewBtn" onClick={this.handleRegister}>
                Register
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      return <Register />;
    }
  }
}

export default Login;
