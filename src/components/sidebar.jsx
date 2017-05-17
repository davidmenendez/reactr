import React from 'react';
import PropTypes from 'prop-types';

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
          <img src={this.props.user.profile_image_url} alt="profile" />
          {this.props.user.name}
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={this.props.activePanel === 'geofeed' ? 'nav--active' : ''} onClick={this.setPanel} role="menuitem"><i className="fa fa-globe" />geofeed</li>
            <li className={this.props.activePanel === 'followers' ? 'nav--active' : ''} onClick={this.setPanel} role="menuitem"><i className="fa fa-users" />followers</li>
            <li className={this.props.activePanel === 'findFollowers' ? 'nav--active' : ''} onClick={this.setPanel} role="menuitem"><i className="fa fa-search" />findFollowers</li>
            <li><a href="/logout"><i className="fa fa-sign-out" />log out</a></li>
          </ul>
        </nav>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  setPanel: PropTypes.func,
  activePanel: PropTypes.string,
  user: PropTypes.shape({
    profile_image_url: PropTypes.string,
    name: PropTypes.name,
  }),
};

Sidebar.defaultProps = {
  setPanel: PropTypes.func.isRequired,
  activePanel: 'geofeed',
  user: {
    profile_image_url: '',
    name: '',
  },
};

export default Sidebar;
