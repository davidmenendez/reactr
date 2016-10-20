import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="loader">
        <p className="jumbo">LOADING</p>
      </div>
    )
  }
}

export default Loader;