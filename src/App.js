import React from 'react';
import Table from './components/Table';
import './App.css';

const App = () => {
  return (
    <div className="App p-6">
      <h1 className="text-2xl font-semibold mb-4">Financial Data</h1>
      <Table />
    </div>
  );
};

export default App;
