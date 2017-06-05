import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }

  render() {
    return (
      <div>
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
    this.setState({
      selectedUser: event.target.value,
    });
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(UserDropdown);
