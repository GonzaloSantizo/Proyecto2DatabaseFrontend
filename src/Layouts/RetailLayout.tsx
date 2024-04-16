import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function RetailLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="flex justify-between gap-4 shadow-sm border p-4 bg-white">
        <h1 className="font-bold">Retail</h1>
        <div className="flex gap-4">
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text-gray-500'
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              isActive ? 'text-blue-500' : 'text-gray-500'
            }
          >
            Orders
          </NavLink>
        </div>
      </header>
      <div className=" bg-slate-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
