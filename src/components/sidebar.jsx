import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setPanel = this.setPanel.bind(this);
  }

  setPanel(e) {
    this.props.setPanel(e.target.textContent);
  }

  render() {
    return (
      <aside className="sidebar">
        <h1>REACTR</h1>
        <div className="sidebar-profile">
          <img src={this.props.user.profile_image_url} />
          {this.props.user.name}
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={this.props.activePanel == "geofeed" ? "nav--active" : ""} onClick={this.setPanel}><i className="fa fa-globe" />geofeed</li>
            <li className={this.props.activePanel == "followers" ? "nav--active" : ""} onClick={this.setPanel}><i className="fa fa-users" />followers</li>
            <li><a href="/logout"><i className="fa fa-sign-out" />log out</a></li>
          </ul>
        </nav>
      </aside>
    )
  }
}

export default Sidebar;