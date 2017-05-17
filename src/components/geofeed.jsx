import React from 'react';
import _ from 'underscore';
import Button from './button';
import ApiRequest from '../lib/request';

class GeoFeed extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      statuses: [],
    };
    this.loadFeed = this.loadFeed.bind(this);
    this.befriend = this.befriend.bind(this);
    this.followAll = this.followAll.bind(this);
    this.followTimeout = this.followTimeout.bind(this);
  }

  componentDidMount() {
    this.loadFeed();
  }

  loadFeed() {
    ApiRequest('geo/search', 'get', (data) => {
      this.setState({ statuses: data.statuses });
    });
  }

  befriend(id) {
    ApiRequest(`friendships/create/${id}`, 'post');
  }

  followAll(e) {
    e.preventDefault();
    let followButtons = document.getElementsByClassName('follow-button');
    for (let i = 0; i < followButtons.length; i += 1) {
      this.followTimeout(followButtons[i], i);
    }
  }

  followTimeout(button, i) {
    setTimeout(() => {
      button.click();
    }, i * 1000);
  }

  addClass(e) {
    e.target.classList.add('clicked');
  }

  render() {
    const feedLocFiltered = this.state.statuses.filter(status => status.user.location.toLowerCase().indexOf('austin') >= 0);
    const feedGrouped = _.map(_.groupBy(feedLocFiltered, status => status.user.id_str), groupedStatus => groupedStatus[0]);
    const feed = feedGrouped.map(status =>
      (
        <li key={status.id}>
          <div>
            <p>
              <a
                href={`http://twitter.com/${status.user.screen_name}`}
                target="_blank"
                onClick={this.addClass}
              >{status.user.screen_name}</a>
            </p>
            <p>Location - {status.user.location ? status.user.location : 'NA'}</p>
          </div>
          <Button
            className="button button--primary follow-button"
            onClick={() => { this.befriend(status.user.id_str); }}
          >follow</Button>
        </li>
      ),
    );
    return (
      <div className="panel">
        <h2>Geofeed</h2>
        <p>Shows all tweets in a given area</p>
        <div className="button-group">
          <button
            className="button button--primary"
            onClick={this.followAll}
          >Follow All</button>
          <button
            className="button button--primary"
            onClick={this.loadFeed}
          >refresh</button>
        </div>
        <ul className="feed">{feed}</ul>
      </div>
    );
  }
}

export default GeoFeed;
