import React from 'react';
import Button from './button';
import ApiRequest from '../lib/request';

class FindFollowers extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      data: [],
      cursor: -1,
      page: 0,
      searchTarget: '',
    };
    this.befriend = this.befriend.bind(this);
    this.loadFollowers = this.loadFollowers.bind(this);
    this.setSearchTarget = this.setSearchTarget.bind(this);
    this.followAll = this.followAll.bind(this);
    this.followTimeout = this.followTimeout.bind(this);
    this.filterFollowers = this.filterFollowers.bind(this);
  }

  befriend(id) {
    ApiRequest(`friendships/create/${id}`, 'post');
  }

  followTimeout(button, i) {
    setTimeout(() => {
      button.click();
    }, i * 1000);
  }

  setSearchTarget(e) {
    this.setState({ searchTarget: e.target.value });
  }

  loadFollowers() {
    ApiRequest(`followers/${this.state.searchTarget}/${this.state.cursor}`, 'get', (data) => {
      this.setState({
        data: data.users,
        cursor: data.next_cursor,
        page: this.state.page + 1,
      });
    });
  }

  followAll(e) {
    e.preventDefault();
    const followButtons = document.getElementsByClassName('follow-button');
    for (let i = 0; i < followButtons.length; i += 1) {
      this.followTimeout(followButtons[i], i);
    }
  }

  filterFollowers(data) {
    return data.map((follower, id) => {
      return (
        <li key={follower.id_str}>
          <div>
            <p>
              <a
                href={`http://twitter.com/${follower.screen_name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                #{id + 1} - {follower.screen_name}
              </a>
            </p>
            <p>location - {follower.location ? follower.location : 'NA'}</p>
          </div>
          <Button
            className="button button--primary follow-button"
            onClick={() => { this.befriend(follower.id_str); }}
          >follow</Button>
        </li>
      );
    });
  }

  render() {
    const followers = this.state.data ? this.filterFollowers(this.state.data) : null;
    return (
      <div className="panel">
        <h2>Followers</h2>
        <p>Shows all current followers for a target</p>
        <div className="filters">
          <h3>Target</h3>
          <input type="text" onChange={this.setSearchTarget} value={this.state.searchTarget} />
          <button className="button button--primary" onClick={this.loadFollowers}>search</button>
        </div>
        <div className="button-group">
          <button className="button button--primary" onClick={this.followAll}>Follow All</button>
          <button
            className="button button--primary"
            onClick={this.loadFollowers}
            disabled={this.state.cursor === 0}
          >next page</button>
        </div>
        <h3>Page #{this.state.page}</h3>
        {followers && followers.length ?
          <ul className="feed">
            {followers}
          </ul>
          :
          <p>no results :(</p>
        }
      </div>
    );
  }
}

export default FindFollowers;
