import React from 'react';

class Filter extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      
    };
    this.getCategories = this.getCategories.bind(this);
  }

  getCategories() {
    if (this.props.data.length) {
      const keys = Object.keys(this.props.data[0]).sort();
      const categories = keys.map((category, id) => {
        return (
          <option key={id} value={category}>{category.replace(/_/g, " ")}</option>
        )
      });
      return categories;
    }
  }

  render() {
    const activeFilters = this.props.filters.map((filter, id) => {
      return (
        <li key={id} onClick={this.props.removeFilter}>{filter}</li>
      )
    });
    const categories = this.getCategories();
    return (
      <div className="filter-controls">
        <select onChange={this.props.setFilterCategory} value={this.props.filterCategory}>
          {categories}
        </select>
        <input type="text" placeholder="filter" onChange={this.props.setCurrentFilter} value={this.props.currentFilter}/>
        <button className="button button--primary" onClick={this.props.addFilter}>add filter</button>
        <button className="button button--attention" onClick={this.props.removeAllFilters}>remove filters</button>
        <ul className="filters-active">
          {activeFilters}
        </ul>
      </div>
    )
  }
}

export default Filter;