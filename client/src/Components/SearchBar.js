import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
