import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  //form from bootsrap
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a Game by Name or Keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
