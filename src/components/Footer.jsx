import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters, FILTERS } from '../actions';

function Footer() {
  return (
    <div style={{ marginTop: 20 }}>
      <span>Show: </span>
      {/* {FILTERS.map(item => (
        <FilterLink filter={item.value}>
          {item.label}
        </FilterLink>
      ))} */}
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>
        All
      </FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
        Active
      </FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
        Completed
      </FilterLink>
    </div>
  );
}

export default Footer;
