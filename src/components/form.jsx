import React from 'react';
import ApiRequest from '../lib/request';
import Button from './button.jsx';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cursor: -1,
      page: 0
    };
    this.loadFollowers = this.loadFollowers.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.loadFollowers();
  }

  getToken() {
    ApiRequest('access-token' + location.search, 'GET', {}, (data) => {
      console.log(data);
    });
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

  destroy(id) {
    ApiRequest('friendships/destroy/' + id, 'POST', {}, (data) => {
      //console.log(data);
    });
  }

  render() {
    let followers = this.state.data.map( (follower, id) => {
      const loc = follower.location.toLowerCase();
      if (
        loc.indexOf('austin') < 0 && 
        loc.indexOf('atx') < 0 && 
        loc.indexOf('tx') < 0 && 
        loc.indexOf('texas') < 0 &&
        loc.length > 0)
        return (
          <li key={follower.id}>
            <a href={"http://twitter.com/" + follower.screen_name} target="_blank">#{id} - {follower.screen_name} - {follower.location}</a>
            <Button className="button" onClick={() => {this.destroy(follower.id)}} text="unfollow" />
          </li>
        )
    });
    return (
      <div>
        <h2>followers</h2>
        <h3>page #{this.state.page}</h3>
        <div className="button-group">
          <a className="button" href="/token">login</a>
          <button className="button" onClick={this.getToken}>get token</button>
          <button className="button" onClick={this.loadFollowers}>next page</button>
        </div>
        <ul>
          {followers}
        </ul>
      </div>
    )
  }
}

export default Form;