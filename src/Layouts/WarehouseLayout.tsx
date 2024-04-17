// WarehouseLayout.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import axios from 'axios';

// Definir tipos para los datos del almacén
type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: number;
};

// Crear un contexto para el almacén
const WarehouseContext = createContext<Warehouse | null>(null);

// Crear un tipo para las propiedades de WarehouseProvider
type WarehouseProviderProps = {
  children: ReactNode;
};

// Crear un proveedor de contexto para el almacén
const WarehouseProvider: React.FC<WarehouseProviderProps> = ({ children }) => {
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const { warehouseId } = useParams<{ warehouseId?: string }>();

  useEffect(() => {
    if (warehouseId) {
      axios.get(`http://localhost:4000/warehouse/${warehouseId}`)
        .then(response => {
          setWarehouse(response.data);
        })
        .catch(error => {
          console.error('Error fetching warehouse details:', error);
        });
    }
  }, [warehouseId]);

  return (
    <WarehouseContext.Provider value={warehouse}>
      {children}
    </WarehouseContext.Provider>
  );
};

// El componente principal de layout que utiliza WarehouseProvider
const WarehouseLayout: React.FC = () => {
  return (
    <WarehouseProvider>
      <div>
        <h1>Disposición del Almacén</h1>
        <Outlet /> {/* Este Outlet renderizará componentes según la ruta actual dentro de WarehouseLayout */}
      </div>
    </WarehouseProvider>
  );
};

// Exportar el contexto para que pueda ser utilizado por otros componentes
export { WarehouseContext, WarehouseLayout };
