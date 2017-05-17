import React from 'react';
import { render } from 'react-dom';
import Followers from './followers';
import Loader from './loader';
import Geofeed from './geofeed';
import FindFollowers from './findFollowers';
import Sidebar from './sidebar';
import ApiRequest from '../lib/request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'geofeed',
      user: '',
    };
    this.setPanel = this.setPanel.bind(this);
  }

  componentDidMount() {
    ApiRequest('user', 'get', (data) => {
      this.setState({ user: data });
    });
  }

  setPanel(panel) {
    this.setState({ activePanel: panel });
  }

  render() {
    const Panel = {
      geofeed: Geofeed,
      followers: Followers,
      findFollowers: FindFollowers,
    }[this.state.activePanel];
    return (
      <div className="app-content">
        <Sidebar
          activePanel={this.state.activePanel}
          user={this.state.user}
          setPanel={this.setPanel}
        />
        <Panel user={this.state.user} />
        <Loader />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
