import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    console.log(this.state.text);
    return <div className="container">
      <form>
        <label for="hashtag">Enter Hashtag</label>
        <input id="hashtag"
          type="text" 
          placeholder="hashtag" 
          onChange={this.inputHandler} 
          value={this.state.hashtag} />
      </form>
    </div>
  }
}

export default Form;