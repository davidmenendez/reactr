import React from 'react';
import {render} from 'react-dom';
import Form from './form';

class App extends React.Component {
  render() {
    return <div>
      <p>Welcome to REACTR</p>
      <Form />
    </div>
  }
}

render(<App />, document.getElementById("app"));