import React from 'react';
import Button from './button.jsx';
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
    this.updateCurrentFilter = this.updateCurrentFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.setFilterCategory = this.setFilterCategory.bind(this);
  }

  componentDidMount() {
    this.loadFollowers();
  }

  destroy(id) {
    ApiRequest(`friendships/destroy/${id}`, 'post');
  }

  loadFollowers() {
    const cursor = this.state.cursor;
    ApiRequest(`followers/${cursor}`, 'get', (data) => {
      this.setState({
        data: data.users,
        cursor: data.next_cursor,
        page: this.state.page + 1
      });
    });
  }

  addFilter() {
    this.setState({ 
      filters: this.state.filters.concat(this.state.currentFilter),
      currentFilter: ''
    });
  }

  updateCurrentFilter(e) {
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
            <Button className="button button--primary" onClick={() => {this.destroy(follower.id_str)}} text="unfollow" />
          </li>
        )
    });
  }

  getCategories() {
    if (this.state.data.length) {
      const keys = Object.keys(this.state.data[0]).sort();
      const categories = keys.map((category, id) => {
        return (
          <option key={id} value={category}>{category.replace(/_/g, " ")}</option>
        )
      });
      return categories;
    }
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
    const categories = this.getCategories();
    return (
      <div>
        <h2>Feed</h2>
        <div className="filters">
          <h3>Filters</h3>
          <div className="filter-controls">
            <select onChange={this.setFilterCategory} defaultValue="location" value={this.state.filterCategory}>
              {categories}
            </select>
            <input type="text" placeholder="filter" onChange={this.updateCurrentFilter} value={this.state.currentFilter}/>
            <button className="button button--primary" onClick={this.addFilter}>add filter</button>
            <button className="button button--attention" onClick={this.removeAllFilters}>remove filters</button>
            <ul className="filters-active">
              {activeFilters}
            </ul>
          </div>
        </div>
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