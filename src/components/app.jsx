import React from 'react';
import {render} from 'react-dom';
import Followers from './followers';
import Loader from './loader';
import Geofeed from './geofeed';
import Sidebar from './sidebar';
import ApiRequest from '../lib/request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 'geofeed'
    };
    this.setPanel = this.setPanel.bind(this);
  }

  componentDidMount() {
    
  }

  setPanel(panel) {
    this.setState({
      activePanel: panel
    });
  }

  render() {
    const Panel = {
      geofeed: Geofeed,
      followers: Followers
    }[this.state.activePanel];
    return (
      <div className="app-content">
        <Sidebar 
          activePanel={this.state.activePanel}
          setPanel={this.setPanel} />
        <Panel />
        <Loader />
      </div>
    )
  }
}

render(<App />, document.getElementById("app"));