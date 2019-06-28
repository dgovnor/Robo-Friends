import React, { Component } from "react";
import CardList from "../component/CardList";
import "./App.css";
import { connect } from "react-redux";
import Error from "../component/Error";
import SearchBox from "../component/SearchBox";
import Scroll from "../component/Scroll";
import { setSearchField, requestRobots } from "../action";

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robot: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const filterRobot = this.props.robot.filter(element => {
      return element.name
        .toLowerCase()
        .includes(this.props.searchField.toLowerCase());
    });
    let message = "";
    if (filterRobot.length === 0) {
      message = "No search found";
    }
    if (this.props.isPending) {
      message = "Loading...";
    }
    return (
      <div className="tc ">
        <h1>RoboFriends</h1>

        <SearchBox search={this.props.onSearchChange} />
        <Error messages={message} />
        <Scroll>
          <CardList robot={filterRobot} />
        </Scroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
