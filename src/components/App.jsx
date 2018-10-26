import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import ContainerAuth from '../containers/ContainerAuth';

class App extends React.Component {
  componentDidMount() {
    const { getUser } = this.props;
    getUser();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ContainerAuth} />
          <Route path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  getUser: PropTypes.func.isRequired,
};

export default App;
