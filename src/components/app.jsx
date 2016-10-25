import React from 'react';
import {render} from 'react-dom';
import Feed from './feed';
import Loader from './loader';
import Geofeed from './geofeed';
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

  setPanel(e) {
    this.setState({
      activePanel: e.target.textContent
    });
  }

  render() {
    const Panel = {
      geofeed: Geofeed,
      feed: Feed
    }[this.state.activePanel];
    return (
      <div>
        <button className={"button " + (this.state.activePanel == "geofeed" ? "button--attention" : "button--secondary")} onClick={this.setPanel}>geofeed</button>
        <button className={"button " + (this.state.activePanel == "feed" ? "button--attention" : "button--secondary")} onClick={this.setPanel}>feed</button>
        <Panel />
        <Loader />
      </div>
    )
  }
}

render(<App />, document.getElementById("app"));