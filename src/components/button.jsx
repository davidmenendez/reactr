import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      active: !this.state.active
    }, () => {
      this.props.onClick();
    });
  }

  render() {
    return (
      <button
        disabled={!this.state.active}
        onClick={this.clickHandler}
        className={this.props.className}>
        {this.props.text}
      </button>
    )
  }
}

export default Button;