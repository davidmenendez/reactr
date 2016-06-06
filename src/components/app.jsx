import React from 'react';
import {render} from 'react-dom';
import Form from './form';

class App extends React.Component {
  render() {
    let data = [{
      'username': 'tod',
      'tweet': 'sup boi'
    },
    {
      'username': 'jane',
      'tweet': 'where they at'
    }];

    return <div>
      <p>Welcome to REACTR</p>
      <Form data={data} />
    </div>
  }
}

render(<App />, document.getElementById("app"));