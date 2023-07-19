import React, { useState, useEffect } from 'react';
import './App.css'; 

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    const delay = setTimeout(() => {
      const data = [
        { id: 1, name: 'Surya Mohan', country: 'India' },
        { id: 2, name: 'Tony Stark', country: 'USA' },
        { id: 3, name: 'Tim David', country: 'UK' },
        { id: 4, name: 'Lusy will', country: 'Spain' },
        { id: 5, name: 'Riyaz william', country: 'Egypt' },
        { id: 6, name: 'Mike Hussey', country: 'France' },
        { id: 7, name: 'keron Pollard', country: 'Italy' },
        { id: 8, name: 'Luis Hernandez', country: 'Mexico' },
        { id: 9, name: 'Oliver Müller', country: 'Germany' },
        { id: 10, name: 'Anna Kim', country: 'South Korea' },
        { id: 11, name: 'Carlos Santos', country: 'Brazil' },
        { id: 12, name: 'Liam Wilson', country: 'Canada' },
        { id: 13, name: 'Sophia Lee', country: 'Australia' },
        { id: 14, name: 'Hiroshi Tanaka', country: 'Japan' },
        { id: 15, name: 'Emilia Rodriguez', country: 'Spain' },
        { id: 16, name: 'Mia Andersson', country: 'Sweden' },
        { id: 17, name: 'Ali Khan', country: 'Pakistan' },
        { id: 18, name: 'Elena Petrova', country: 'Russia' },
        { id: 19, name: 'Pedro Martinez', country: 'Dominican Republic' },
        { id: 20, name: 'Sofia Lopez', country: 'Argentina' },
      ];
      setCustomers(data);
      setFilteredCustomers(data);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const handleFilter = (filterValue) => {
    if (filterValue === 'India') {
      setFilteredCustomers(customers.filter(customer => customer.country === 'India'));
    } else if (filterValue === 'Outside India') {
      setFilteredCustomers(customers.filter(customer => customer.country !== 'India'));
    } else {
      setFilteredCustomers(customers);
    }
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchValue(searchInput);
    const filteredData = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchInput) ||
      customer.country.toLowerCase().includes(searchInput)
    );
    setFilteredCustomers(filteredData);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sortedData = [...filteredCustomers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredCustomers(sortedData);
  };

  const handleSelectCustomer = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const renderCustomerRows = currentCustomers.map(customer => (
    
    <tr key={customer.id}>
      <td>
        <div className='custom-control custom-checkbox'>
        <input
          type="checkbox"
          class="custom-control-input"
          checked={selectedCustomers.includes(customer.id)}
          onChange={() => handleSelectCustomer(customer.id)}
        />
        </div>
      </td>
      
      <td><div className='custom-control custom-checkbox'>{customer.name}</div></td>
      <td>{customer.country}</td>
      <td>{customer.id}</td>
    </tr>
  ));

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    console.log('Selected Customers:', selectedCustomers);
  }, [selectedCustomers]);

  return (
    <div className="container">
      
      
      <div className="search-container">
        
        <input type="text" name= "search"placeholder="Search..."className="search-input" value={searchValue} onChange={handleSearch} />
        <a href="#" className="search-btn"><i className="fas fa-search"></i></a>
      </div>
      <div className='table-container'>
        <div className='row'>
          <div className='col-12'>
      <table className="table-bordered">
        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col"onClick={handleSort}>Name</th>
            <th scope="col">Country</th>
            <th scope="col">ID</th>
          </tr>
        </thead>
        <tbody>
          {renderCustomerRows}
        </tbody>
      </table>
      </div>
      </div>
      </div>
      <div className="pagination-container">
        {renderPaginationButtons()}
      </div>
    {/*  */}
    <div className="filter-container">
        <label  for='styledSelect1'>Filter by Country:</label>
        <select  className='custom-select'onChange={(e) => handleFilter(e.target.value)} name='options'>
          <option value="">All</option>
          <option value="India">India</option>
          <option value="Outside India">Outside India</option>
        </select>
      </div>
       </div>
    
  );
};

export default CustomerTable;
