import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers';
import UserDropdown from './containers/user-dropdown';
import UserCalendar from './containers/user-calendar';
import WeekStatusUpdater from './containers/week-status-control';

import 'clndr';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

  }

  render() {
    return (
      <div className="row">
        <h1 className="text-center">Challenge</h1>
        <UserDropdown />
        <UserCalendar />
        <WeekStatusUpdater />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container')
);
