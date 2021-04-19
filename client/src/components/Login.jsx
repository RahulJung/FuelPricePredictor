import React from "react";
import Axios from "axios";
import Register from "./Register.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      isRegistered: false,
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
        console.log(res.data);
      })
      .then(() => {
        this.setState({
          name: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log("Error Logging user");
      });
  }

  render() {
    if (!this.state.isRegistered) {
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
            <input type="submit" value="Login"></input>
            <button onClick={this.handleRegister}>Register</button>
          </form>
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
