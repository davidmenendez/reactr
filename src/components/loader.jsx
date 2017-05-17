import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }
}

export default Loader;
