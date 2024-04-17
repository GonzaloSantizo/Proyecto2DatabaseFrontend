import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function WarehouseLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="flex justify-between gap-4 shadow-sm border p-4 bg-white">
        <h1 className="font-bold">Warehouses</h1>
        <div className="flex gap-4">
          <NavLink
            to="Warehouse"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
            }
          >
            Stock
          </NavLink>
          <NavLink
            to="OrdersWarehouse"
            className={({ isActive }) =>
              isActive ? 'text-blue-500 font-bold' : 'text-gray-500'
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
