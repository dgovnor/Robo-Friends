import React, { Component } from "react";
import CardList from "../component/CardList";
import "./App.css";
import Error from "../component/Error";
import SearchBox from "../component/SearchBox";
import Scroll from "../component/Scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robot: [],
      searchField: ""
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => this.setState({ robot: users }));
  }
  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const filterRobot = this.state.robot.filter(element => {
      return element.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });
    let message = "";
    if (filterRobot.length === 0) {
      message = "No search found";
    }
    if (this.state.robot.length === 0) {
      message = "Loading...";
    }
    return (
      <div className="tc ">
        <h1>RoboFriends</h1>

        <SearchBox search={this.onSearchChange} />
        <Error messages={message} />
        <Scroll>
          <CardList robot={filterRobot} />
        </Scroll>
      </div>
    );
  }
}

export default App;
