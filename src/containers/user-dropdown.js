import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../actions/index';
import { bindActionCreators } from 'redux';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }

  render() {
    return (
      <div className="row">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Select User</label>
            <div className="col-sm-4">
              <select
                value={this.state.selectedUser}
                onChange={this.onSelectUser.bind(this)}
                className="form-control">
                <option value=""></option>
                {this.props.users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  )
                })}
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
      selectedUser: value,
    }, () => {
      const selectedUserObject = this.props.users.filter(x => x.id === +value)[0];

      this.props.selectUser(selectedUserObject || "");
    });
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser: selectUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
