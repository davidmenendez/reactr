import React from 'react';
import {render} from 'react-dom';
import Feed from './feed';
import Loader from './loader';
import ApiRequest from '../lib/request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Feed />
        <Loader />
      </div>
    )
  }
}

render(<App />, document.getElementById("app"));