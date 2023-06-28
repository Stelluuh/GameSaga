import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

const GameSearch = ({ handleSearch, handleFilter, handleSort }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterInputChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSortInputChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div>
      <Form className="my-3">
        <Form.Group controlId="search">
          <Form.Control type="text" placeholder="Search games" onChange={(e) => handleSearch(e.target.value)} />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-between align-items-center my-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="filterDropdown">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Filter options */}
            <Dropdown.Item onSelect={() => handleFilter('option1')}>Option 1</Dropdown.Item>
            <Dropdown.Item onSelect={() => handleFilter('option2')}>Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="sortDropdown">
            Sort
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Sort options */}
            <Dropdown.Item onSelect={() => handleSort('option1')}>Option 1</Dropdown.Item>
            <Dropdown.Item onSelect={() => handleSort('option2')}>Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="primary">Reset</Button>
      </div>
    </div>
  );
};

export default GameSearch;
