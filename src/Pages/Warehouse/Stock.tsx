// Importaciones necesarias
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
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
  const { warehouseId } = useParams<{ warehouseId?: string }>(); // Usar `?` para hacerlo opcional en caso de que sea indefinido

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

// Componente principal que usará el contexto para mostrar los datos
const Stock: React.FC = () => {
  const warehouse = useContext(WarehouseContext);

  if (!warehouse) {
    return <div>Cargando información del almacén...</div>;
  }

  return (
    <div>
      <h2>Almacén: {warehouse.name}</h2>
      <p>Ubicación: {warehouse.location}</p>
      <p>Capacidad: {warehouse.capacity} unidades</p>
    </div>
  );
};

// Exportar Stock para ser utilizado dentro de la estructura de rutas de WarehouseProvider
export default Stock;

// En el componente que maneja tus rutas, tendrás algo como esto:
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="warehouse/:warehouseId" element={<WarehouseProvider children={undefined} />}>
        <Route index element={<div>Seleccione un almacén</div>} />
        <Route path="stock" element={<Stock />} />
      </Route>
      {/* Otras rutas... */}
    </Routes>
  );
};

// Asegúrate de que el componente App sea el exportado por defecto en tu punto de entrada (por ejemplo, index.tsx)
