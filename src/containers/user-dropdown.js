import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser, fetchUsers, fetchWeeks } from '../actions/index';
import { bindActionCreators } from 'redux';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers(user) {
    return (
      <option key={user.id} value={user.id}>{user.username}</option>
    );
  }

  render() {
    if (!this.props.users.length) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="row col-sm-12">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Select User</label>
            <div className="col-sm-4">
              <select
                value={this.state.selectedUser}
                onChange={this.onSelectUser.bind(this)}
                className="form-control">
                <option value=""></option>
                {this.props.users.map(this.renderUsers)}
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  }

  onSelectUser(event) {
    const value = event.target.value;
    this.setState({
      selectedUser: +value,
    }, () => {
      const selectedUserObject = this.props.users.filter(x => x.id === +value)[0];

      this.props.selectUser(selectedUserObject || "");
      const date = new Date;
      const month = date.getMonth() + 1;

      if (value !== "") this.props.fetchWeeks(month, value);
    });
  }
}

function mapStateToProps({ users }) {
  return { users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectUser: selectUser,
    fetchUsers: fetchUsers,
    fetchWeeks: fetchWeeks,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
