import './App.css';
import { Route, Routes } from 'react-router-dom';
import RetailLayout from './Layouts/RetailLayout';
import WarehouseLayout from './Layouts/WarehouseLayout';
import Products from './Pages/Retail/Products';
import Main from './Pages/Main';
import Product from './Pages/Retail/Product';
import Orders from './Pages/Retail/Orders';
import OrdersWarehouse from './Pages/Warehouse/OrdersWarehouse';
import { CartProvider } from './Pages/Retail/CartContext';
import Cart from './Pages/Retail/Cart';
import { Toaster } from 'sonner';
import Order from './Pages/Retail/Order';
import  Manufacturer  from './Pages/Manufacturer/Manufacturer';
import Warehouse from './Pages/Warehouse/Stock';
import OrderInfoWarehouse from './Pages/Warehouse/OrderInfoWarehouse';



function App() {
  return (
    <CartProvider>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/retail" element={<RetailLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:orderId" element={<Order />} />
        </Route>

        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<OrdersWarehouse />} />
          <Route path="orders" element={<Warehouse />} />
          <Route path="orders" element={<OrdersWarehouse />} />
          <Route path="orderinfowarehouse/:orderId" element={<OrderInfoWarehouse />} />
        </Route>
        <Route path="/manufacturer" element={<Manufacturer />} />
      </Routes>
    </CartProvider>
  );
}
export default App;
