import React from 'react';
import ApiRequest from '../lib/request';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: '',
      username: '',
      tweet: '',
      data: []
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.loadTweets = this.loadTweets.bind(this);
  }

  componentDidMount() {
    this.loadTweets();
  }

  loadTweets() {
    ApiRequest((data) => {
      console.log(data.statuses);
      this.setState({data: data.statuses});
    });
  }

  inputHandler(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value});
  }

  formHandler(e) {
    e.preventDefault();
    if(!this.state.username || !this.state.tweet) return
    let tweet = {
      user: {
        screen_name: this.state.username
      },
      text: this.state.tweet
    };
    this.setState({
      data: this.state.data.concat(tweet)
    }, function() {
      this.setState({ tweet: '', username: '' })
    });
  }

  render() {
    return <div className="container">
      <form>
        <div className="input">
          <label for="hashtag">Enter Hashtag</label>
          <input id="hashtag"
            type="text"
            placeholder="hashtag"
            onChange={this.inputHandler}
            value={this.state.hashtag} />
          </div>
      </form>
      <form onSubmit={this.formHandler}>
        <h2>Add Tweet</h2>
        <div className="input">
          <input id="username" type="text" placeholder="username" onChange={this.inputHandler} value={this.state.username} />
          <input id="tweet" type="text" placeholder="tweet" onChange={this.inputHandler} value={this.state.tweet} />
          <button type="submit">tweet</button>
        </div>
      </form>
      <h2>tweets</h2>
      <ul>
        {
          this.state.data.map((tweet, id) => {
            return <li key={id} className="tweet">
              <img src={tweet.user.profile_image_url} />
              <p>{tweet.user.screen_name} - {tweet.text}</p>
            </li>
          })
        }
      </ul>
    </div>
  }
}

export default Form;