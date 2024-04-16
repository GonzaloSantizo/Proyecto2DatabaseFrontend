import { Link } from 'react-router-dom';
import styles from './Main.module.css';

export default function Main() {
  return (
    <div className={styles.container}>
      <div className="flex flex-col gap-4">
        <Link to="/retail/products">
          <button className="bg-gradient-to-t from-blue-600 to-blue-500 px-2 py-1 rounded-lg text-white w-full">
            Retail
          </button>
        </Link>
        <Link to="/warehouse" className="link">
          <button className="bg-gradient-to-t from-blue-600 to-blue-500 px-2 py-1 rounded-lg text-white w-full">
            Warehouse
          </button>
        </Link>
        <Link to="/manufacturer" className="link">
          <button className="bg-gradient-to-t from-blue-600 to-blue-500 px-2 py-1 rounded-lg text-white w-full">
            Manufacturer
          </button>
        </Link>
      </div>
    </div>
  );
}
