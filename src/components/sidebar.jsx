import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.setPanel = this.setPanel.bind(this);
  }

  setPanel(e) {
    this.props.setPanel(e.target.textContent);
  }

  render() {
    return (
      <aside className="sidebar">
        <ul>
          <li className={this.props.activePanel == "geofeed" ? "nav--active" : ""} onClick={this.setPanel}>geofeed</li>
          <li className={this.props.activePanel == "followers" ? "nav--active" : ""} onClick={this.setPanel}>followers</li>
        </ul>
      </aside>
    )
  }
}

export default Sidebar;