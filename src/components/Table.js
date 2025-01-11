import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Table = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [revenueRange, setRevenueRange] = useState({ min: '', max: '' });
  const [netIncomeRange, setNetIncomeRange] = useState({ min: '', max: '' });
  const [sortColumn, setSortColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
        );
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = [...data];

    // Apply date range filter
    if (startDate || endDate) {
      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date);
        if (startDate && endDate) return rowDate >= startDate && rowDate <= endDate;
        if (startDate) return rowDate >= startDate;
        if (endDate) return rowDate <= endDate;
        return true;
      });
    }

    // Apply revenue range filter
    if (revenueRange.min || revenueRange.max) {
      filtered = filtered.filter((row) => {
        const revenue = row.revenue || 0;
        if (revenueRange.min && revenueRange.max) return revenue >= revenueRange.min && revenue <= revenueRange.max;
        if (revenueRange.min) return revenue >= revenueRange.min;
        if (revenueRange.max) return revenue <= revenueRange.max;
        return true;
      });
    }

    // Apply net income range filter
    if (netIncomeRange.min || netIncomeRange.max) {
      filtered = filtered.filter((row) => {
        const netIncome = row.netIncome || 0;
        if (netIncomeRange.min && netIncomeRange.max)
          return netIncome >= netIncomeRange.min && netIncome <= netIncomeRange.max;
        if (netIncomeRange.min) return netIncome >= netIncomeRange.min;
        if (netIncomeRange.max) return netIncome <= netIncomeRange.max;
        return true;
      });
    }

    setFilteredData(filtered);
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(order);
    setSortColumn(column);

    const sorted = [...filteredData].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (column === 'date') {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });

    setFilteredData(sorted);
  };

  return (
    <div className="container mx-auto px-6 py-8 font-sans bg-gradient-to-r from-blue-50 to-indigo-50">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8 animate-fadeIn">
        Financial Data for AAPL
      </h1>

      {/* Filters Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Apply Filters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Date Range:</label>
            <div className="flex space-x-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
                dateFormat="yyyy-MM-dd"
              />
              <span className="text-lg text-gray-600">to</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>

          {/* Revenue Range Filter */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Revenue Range:</label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min Revenue"
                value={revenueRange.min}
                onChange={(e) => setRevenueRange({ ...revenueRange, min: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Max Revenue"
                value={revenueRange.max}
                onChange={(e) => setRevenueRange({ ...revenueRange, max: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Net Income Range Filter */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Net Income Range:</label>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Min Net Income"
                value={netIncomeRange.min}
                onChange={(e) => setNetIncomeRange({ ...netIncomeRange, min: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Max Net Income"
                value={netIncomeRange.max}
                onChange={(e) => setNetIncomeRange({ ...netIncomeRange, max: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={applyFilters}
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-indigo-100 text-indigo-700 font-semibold">
            <tr>
              <th
                className="border px-6 py-4 text-left cursor-pointer hover:text-indigo-900 transition-all"
                onClick={() => handleSort('date')}
              >
                Date {sortColumn === 'date' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className="border px-6 py-4 text-left cursor-pointer hover:text-indigo-900 transition-all"
                onClick={() => handleSort('revenue')}
              >
                Revenue {sortColumn === 'revenue' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className="border px-6 py-4 text-left cursor-pointer hover:text-indigo-900 transition-all"
                onClick={() => handleSort('netIncome')}
              >
                Net Income {sortColumn === 'netIncome' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="border px-6 py-4 text-left">Gross Profit</th>
              <th className="border px-6 py-4 text-left">EPS</th>
              <th className="border px-6 py-4 text-left">Operating Income</th>
            </tr>
          </thead>
          <tbody className="animate-fadeIn">
            {filteredData.length > 0 ? (
                           filteredData.map((row, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? 'bg-indigo-50' : 'bg-white'
                              } hover:bg-indigo-200 transition-colors`}
                            >
                              <td className="border px-6 py-4">{row.date}</td>
                              <td className="border px-6 py-4">${row.revenue?.toLocaleString()}</td>
                              <td className="border px-6 py-4">${row.netIncome?.toLocaleString()}</td>
                              <td className="border px-6 py-4">${row.grossProfit?.toLocaleString()}</td>
                              <td className="border px-6 py-4">{row.eps}</td>
                              <td className="border px-6 py-4">${row.operatingIncome?.toLocaleString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="border px-6 py-4 text-center text-gray-600">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            };
            
            export default Table;
            