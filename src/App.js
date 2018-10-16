import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      user: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/isLoggedIn")
      .then(({ data, status }) => {
        if (status === 200)
          this.setState({ isLoggedIn: true, user: data.username });
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    let { username, password } = this.state;
    axios
      .post("/api/login", {
        username,
        password
      })
      .then(({ status, data }) => {
        if (status === 200)
          this.setState({ isLoggedIn: true, user: data.username });
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }
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
        {isLoggedIn ? (
          <h1>You did it, {this.state.user}!</h1>
        ) : (
          <h1>Error logging in</h1>
        )}
      </div>
    );
  }
}

export default App;
