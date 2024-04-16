import { Link, Outlet } from 'react-router-dom';

export default function RetailLayout() {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="flex justify-between gap-4 shadow-sm border p-4 bg-white">
        <h1 className="font-bold">Retail</h1>
        <div className="flex gap-4">
          <Link to="products">Products</Link>
          <Link to="cart">Cart</Link>
          <Link to="orders">Orders</Link>
        </div>
      </header>
      <div className=" bg-slate-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
