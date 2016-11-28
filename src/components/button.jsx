import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({
      active: !this.state.active
    }, () => {
      this.props.onClick(e);
    });
  }

  render() {
    return (
      <button
        disabled={!this.state.active}
        onClick={this.clickHandler}
        className={this.props.className}>
        {this.props.children}
      </button>
    )
  }
}

export default Button;