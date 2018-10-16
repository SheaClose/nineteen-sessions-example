import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    password: "",
    isLoggedIn: false
  };
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleClick = async () => {
    let { username, password } = this.state;
    let { status } = await axios.post("/api/login", { username, password });
    console.log("status: ", status);
    if (status === 200) this.setState({ isLoggedIn: true });
  };
  render() {
    let { username, password, isLoggedIn } = this.state;
    return (
      <div className="App">
        <div className="form">
          <input
            onChange={this.handleChange}
            name="username"
            value={username}
            placeholder="user name"
          />
          <input
            onChange={this.handleChange}
            name="password"
            value={password}
            type="password"
            placeholder="password"
          />
          <button onClick={this.handleClick}>Submit</button>
        </div>
        {isLoggedIn ? <h1>You did it!</h1> : null}
      </div>
    );
  }
}

export default App;
