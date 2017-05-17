import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  constructor(state) {
    super(state);
    this.state = {};
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories() {
    let categoryId = 0;
    if (this.props.data.length) {
      const keys = Object.keys(this.props.data[0]).sort();
      const categories = keys.map((category) => {
        categoryId += 1;
        return (
          <option key={categoryId} value={category}>{category.replace(/_/g, ' ')}</option>
        );
      });
      return categories;
    }
    return false;
  }

  render() {
    let filterId = 0;
    const activeFilters = this.props.filters.map((filter) => {
      filterId += 1;
      return (
        <li
          key={filterId}
          onClick={this.props.removeFilter}
          className="filter-label"
          role="button"
        >{filter}</li>
      );
    });
    const categories = this.getCategories();
    return (
      <div className="filter-controls">
        <form onSubmit={this.props.addFilter}>
          <div className="flex-row">
            <div className="flex-col">
              <label htmlFor="filterCategory">Category</label>
              <select
                name="filterCategory"
                onChange={this.props.setFilterCategory}
                value={this.props.filterCategory}
              >{categories}</select>
            </div>
            <div className="flex-col">
              <label htmlFor="filter">Filter</label>
              <input
                name="filter"
                type="text"
                placeholder="filter"
                onChange={this.props.setCurrentFilter}
                value={this.props.currentFilter}
              />
            </div>
          </div>
          <div className="button-group">
            <button
              className="button button--primary"
              onClick={this.props.addFilter}
            >add filter</button>
            <button
              className="button button--primary"
              onClick={this.props.removeAllFilters}
            >remove filters</button>
          </div>
          <ul className="filters-active">
            {activeFilters}
          </ul>
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  removeFilter: PropTypes.func,
  addFilter: PropTypes.func,
  setFilterCategory: PropTypes.func,
  filterCategory: PropTypes.func,
  setCurrentFilter: PropTypes.func,
  removeAllFilters: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.string),
  currentFilter: PropTypes.string,
};

Filter.defaultProps = {
  currentFilter: '',
  filters: [],
  data: [],
};

export default Filter;
