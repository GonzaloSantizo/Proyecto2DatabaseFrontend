import React from 'react';
import styles from './Manufacturer.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

function Manufacturer() {
  return (
    <div className={styles.manufacturerContainer}>
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl p-2 md:p-3 text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
        Add information about the manufacturer
      </div>
      <div className={styles.manufacturerBody}>

      </div>
    </div>

  );
}

export default  Manufacturer