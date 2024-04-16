import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { RetailLayout } from './Layouts/RetailLayout';
import Products from './Pages/Retail/Products';
import { Button, Flex } from '@mantine/core';
import Main from './Pages/Main';

function Warehouse() {
  return <h1>Warehouse Layout</h1>;
}

function Manufacturer() {
  return <h1>Manufacturer Layout</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/retail" element={<RetailLayout />}>
        <Route path="products" index element={<Products />} />
      </Route>

      <Route path="/warehouse" element={<Warehouse />}>
        <Route index element={<Warehouse />} />
      </Route>
      <Route path="/manufacturer" element={<Manufacturer />} />
    </Routes>
  );
}

export default App;
