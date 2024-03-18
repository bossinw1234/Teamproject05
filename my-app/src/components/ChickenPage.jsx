import React, { useState, useEffect } from 'react';

const ChickenPage = () => {
  const [chickenMenu, setChickenMenu] = useState(null);

  useEffect(() => {
    // ส่งคำร้องขอไปยัง API เพื่อข้อมูลเมนูไก่
    fetch('http://localhost:3080/api/chicken')
      .then(response => response.json())
      .then(data => {
        setChickenMenu(data);
      })
      .catch(error => console.error('Error fetching chicken menu:', error));
  }, []);

  return (
    <div>
      {chickenMenu ? (
        <div>
          <h1>{chickenMenu.name}</h1>
          <p>{chickenMenu.description}</p>
          <p>Price: {chickenMenu.price} THB</p>
          <img src={chickenMenu.image} alt={chickenMenu.name} />
        </div>
      ) : (
        <p>Loading chicken menu...</p>
      )}
    </div>
  );
};

export default ChickenPage;
