import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: '',
      username: '',
      tweet: '',
      data: this.props.data
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
  }

  inputHandler(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value});
  }

  formHandler(e) {
    e.preventDefault();
    let tweet = {
      username: this.state.username,
      tweet: this.state.tweet
    };
    this.setState({
      data: this.state.data.concat(tweet)
    }, function() {
      this.setState({ tweet: '', username: '' })
    });
  }

  render() {
    let tweets = this.state.data.map((tweet, id) => {
      return <div key={id}>
        {tweet.username} - {tweet.tweet}
      </div>
    });
    return <div className="container">
      <form>
        <label for="hashtag">Enter Hashtag</label>
        <input id="hashtag"
          type="text"
          placeholder="hashtag"
          onChange={this.inputHandler}
          value={this.state.hashtag} />
      </form>
      <form onSubmit={this.formHandler}>
        <h2>Add Tweet</h2>
        <input id="username" type="text" placeholder="username" onChange={this.inputHandler} value={this.state.username} />
        <input id="tweet" type="text" placeholder="tweet" onChange={this.inputHandler} value={this.state.tweet} />
        <button type="submit">tweet</button>
      </form>
      <h2>tweets</h2>
      {tweets}
    </div>
  }
}

export default Form;