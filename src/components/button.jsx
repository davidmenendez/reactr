import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({
      active: !this.state.active,
    }, () => {
      this.props.onClick(e);
    });
  }

  render() {
    return (
      <button
        disabled={!this.state.active}
        onClick={this.clickHandler}
        className={this.props.className}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: 'button',
};

export default Button;
