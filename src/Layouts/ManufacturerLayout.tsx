import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function RetailLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-poppins">
      <header className="flex justify-between gap-4 shadow-sm border p-4 bg-white">
        <h1 className="font-bold">Manufacturers</h1>
        <div className="flex gap-4">
          <NavLink
            to="suppliers"
            className={({ isActive }) =>
              isActive ? 'text-rose-500 font-bold' : 'text-gray-500'
            }
          >
            Suppliers
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              isActive ? 'text-rose-500 font-bold' : 'text-gray-500'
            }
          >
            Products
          </NavLink>
          <NavLink
            to="analytics"
            className={({ isActive }) =>
              isActive ? 'text-rose-500 font-bold' : 'text-gray-500'
            }
          >
            Analytics
          </NavLink>
        </div>
      </header>
      <div className=" bg-slate-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
