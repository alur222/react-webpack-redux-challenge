import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateWeekStatus } from '../actions/index';
import { bindActionCreators } from 'redux';

import $ from 'jquery';
import _ from 'lodash';

class WeekStatusUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
    };
  }

  notesChange(event) {
    const value = event.target.value;
    this.setState({
      notes: value,
      showPane: true,
    });
  }

  handleApprove(event) {
    const status = 'approved';
    const weekId = this.props.userWeek.week_id;
    const userId = this.props.user.id;
    const notes = this.state.notes;
    this.props.updateWeekStatus(status, weekId, userId, notes);
  }

  handleReject(event) {
    const status = 'rejected';
    const weekId = this.props.userWeek.week_id;
    const userId = this.props.user.id;
    const notes = this.state.notes;
    this.props.updateWeekStatus(status, weekId, userId, notes);
  }

  componentWillReceiveProps(props) {
    if (props.userWeek.hasOwnProperty('serverUpdated')) {
      alert('Status Updated!');
    }
  }

  render() {
    if(!this.props.userWeek.hasOwnProperty('week_id')) {
      return (
        <div></div>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <textarea placeholder="add notes" className="form-control" value={this.state.notes} onChange={this.notesChange.bind(this)} />
        </div>
        <div className="col-sm-12">
          <button className="btn btn-large btn-block" onClick={this.handleApprove.bind(this)}>Approve</button>
          <button className="btn btn-large btn-block" onClick={this.handleReject.bind(this)}>Reject</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userWeek: state.userWeek,
    user: state.selectedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateWeekStatus: updateWeekStatus,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekStatusUpdater);
