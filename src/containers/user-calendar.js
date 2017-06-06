import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserCalendar extends Component {
  render() {
    if(!this.props.user) {
      return (
        <div>Select a user to get started.</div>
      );
    }
    return (
      <div className="row col-sm-12">
        <p>User Calendar</p>
        <p>{this.props.user.id}</p>
        <p>{this.props.user.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}

export default connect(mapStateToProps)(UserCalendar);
