import React from 'react';
import Button from './button.jsx';
import ApiRequest from '../lib/request';

class GeoFeed extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      statuses: []
    };
    this.loadFeed = this.loadFeed.bind(this);
    this.befriend = this.befriend.bind(this);
  }

  componentDidMount() {
    this.loadFeed();
  }

  loadFeed() {
    ApiRequest('geo/search', 'get', (data) => {
      this.setState({
        statuses: data.statuses
      });
    });
  }

  befriend(id) {
    ApiRequest(`friendships/create/${id}`, 'post');
  }

  render() {
    const feed = this.state.statuses.map((status, id) => {
      return (
        <li key={status.id}>
          <div>
            <p><a href={"http://twitter.com/" + status.user.screen_name} target="_blank">#{id + 1} - {status.user.screen_name}</a></p>
            <p>location - {status.user.location ? status.user.location : 'NA'}</p>
          </div>
          <Button className="button button--primary" onClick={() => {this.befriend(status.user.id_str)}} text="follow" />
        </li>
      )
    });
    return (
      <div>
        <h2>GEO FEED</h2>
        <ul className="feed">{feed}</ul>
      </div>
    )
  }
}

export default GeoFeed;