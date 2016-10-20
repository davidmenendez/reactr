import React from 'react';
import Button from './button.jsx';
import ApiRequest from '../lib/request';

class Feed extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      data: [],
      cursor: -1,
      page: 0
    };
    this.loadFollowers = this.loadFollowers.bind(this);
    this.filterFollowers = this.filterFollowers.bind(this);
  }

  componentDidMount() {
    this.loadFollowers();
  }

  destroy(id) {
    ApiRequest('friendships/destroy/' + id, 'POST', {});
  }

  loadFollowers() {
    var opts = {
      cursor: this.state.cursor
    };
    ApiRequest('followers/', 'GET', opts, (data) => {
      this.setState({
        data: data.users,
        cursor: data.next_cursor,
        page: this.state.page + 1
      });
    });
  }

  filterFollowers(data) {
    return data.filter((follower, id) => {
      const loc = follower.location.toLowerCase();
      return loc.indexOf('atx') < 0 && loc.indexOf('austin') < 0 && loc.indexOf('tx') < 0 && loc.indexOf('texas') < 0
    }).map((follower, id) => {
        return (
          <li key={follower.id_str}>
            <div>
              <p><a href={"http://twitter.com/" + follower.screen_name} target="_blank">#{id + 1} - {follower.screen_name}</a></p>
              <p>location - {follower.location ? follower.location : 'NA'}</p>
            </div>
            <Button className="button button--primary" onClick={() => {this.destroy(follower.id_str)}} text="unfollow" />
          </li>
        )
    });
  }

  render() {
    const followers = this.state.data ? this.filterFollowers(this.state.data) : null;
    return (
      <div>
        <h2>Feed</h2>
        <div className="button-group">
          <button className="button button--primary" onClick={this.loadFollowers} disabled={this.state.cursor === 0}>next page</button>
        </div>
        <h3>Page #{this.state.page}</h3>
        <ul className="feed">
          {followers && followers.length ? followers : <p>no results :(</p>}
        </ul>
      </div>
    )
  }
}

export default Feed;