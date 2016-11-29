import React from 'react';
import Button from './button.jsx';
import Filter from './filter.jsx';
import ApiRequest from '../lib/request';

class Feed extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      data: [],
      cursor: -1,
      page: 0,
      filters: [],
      currentFilter: '',
      filterCategory: 'location'
    };
    this.loadFollowers = this.loadFollowers.bind(this);
    this.filterFollowers = this.filterFollowers.bind(this);
    this.setCurrentFilter = this.setCurrentFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
    this.setFilterCategory = this.setFilterCategory.bind(this);
    this.unfollowAll = this.unfollowAll.bind(this);
    this.unfollowTimeout = this.unfollowTimeout.bind(this);
  }

  componentDidMount() {
    this.loadFollowers();
  }

  destroy(id) {
    ApiRequest(`friendships/destroy/${id}`, 'post');
  }

  loadFollowers() {
    const cursor = this.state.cursor;
    ApiRequest(`followers/${this.props.user.screen_name}/${cursor}`, 'get', (data) => {
      this.setState({
        data: data.users,
        cursor: data.next_cursor,
        page: this.state.page + 1
      });
    });
  }

  addFilter(e) {
    e.preventDefault();
    if (this.state.currentFilter)
      this.setState({ 
        filters: this.state.filters.concat(this.state.currentFilter),
        currentFilter: ''
      });
  }

  setCurrentFilter(e) {
    this.setState({ currentFilter: e.target.value });
  }

  removeFilter(e) {
    const filters = this.state.filters.slice();
    filters.splice(filters.indexOf(e.target.textContent), 1);
    this.setState({ filters: filters });
  }

  removeAllFilters() {
    this.setState({ filters: [] });
  }

  unfollowAll(e) {
    e.preventDefault();
    let followButtons = document.getElementsByClassName('follow-button');
    for (let i = 0; i < followButtons.length; i++) {
      this.unfollowTimeout(followButtons[i], i);
    }
  }

  unfollowTimeout(button, i) {
    setTimeout(() => {
      button.click();
    }, i * 1000);
  }

  filterFollowers(data) {
    return data.filter((follower, id) => {
      const followerFilter = String(follower[this.state.filterCategory]).toLowerCase();
      const results = this.state.filters.map((filter, id) => {
        return followerFilter.indexOf(filter) < 0
      });
      return results.indexOf(false) < 0
    }).map((follower, id) => {
        return (
          <li key={follower.id_str}>
            <div>
              <p><a href={"http://twitter.com/" + follower.screen_name} target="_blank">#{id + 1} - {follower.screen_name}</a></p>
              <p>location - {follower.location ? follower.location : 'NA'}</p>
            </div>
            <Button className="button button--primary follow-button" onClick={() => {this.destroy(follower.id_str)}}>unfollow</Button>
          </li>
        )
    });
  }

  setFilterCategory(e) {
    this.setState({ filterCategory: e.target.value })
  }

  render() {
    const followers = this.state.data ? this.filterFollowers(this.state.data) : null;
    const activeFilters = this.state.filters.map((filter, id) => {
      return (
        <li key={id} onClick={this.removeFilter}>{filter}</li>
      )
    });
    return (
      <div className="panel">
        <h2>Followers</h2>
        <p>Shows all current followers</p>
        <div className="filters">
          <h3>Filters</h3>
          <Filter
          data={this.state.data}
          filters={this.state.filters}
          filterCategory={this.state.filterCategory}
          setFilterCategory={this.setFilterCategory}
          addFilter={this.addFilter}
          removeAllFilters={this.removeAllFilters}
          setCurrentFilter={this.setCurrentFilter}
          removeFilter={this.removeFilter}
          currentFilter={this.state.currentFilter} />
        </div>
        <div className="button-group">
          <button className="button button--primary" onClick={this.unfollowAll}>UnFollow All</button>
          <button className="button button--primary" onClick={this.loadFollowers} disabled={this.state.cursor === 0}>next page</button>
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
    )
  }
}

export default Feed;