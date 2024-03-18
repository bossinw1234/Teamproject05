import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChickenPage.css'; // Import CSS file for styling

const MenuContainer = ({ name, category, calorie, image }) => (
  <div className="col-md-4">
    <div className="menu-container">
      <p>{name}</p>
      <p>{category}</p>
      <p>{calorie} </p>
      <img src={image} alt={name} className="menu-image" />
    </div>
  </div>
);

const ChickenPage = () => {
  const [chickenMenu, setChickenMenu] = useState(null);

  useEffect(() => {
    // Send request to server to fetch chicken menu data from MySQL
    fetch('/api/chicken') // Change from '/api/chickenMenu' to '/api/chicken'
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
          <div className="row">
            <div className="col-md-3 mb-2">
              <Link to="/ChickenPage" className="btn btn-lg btn-block" style={{ backgroundColor: 'rgb(201, 222, 190)', color: 'white' }}>เมนูต้ม</Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link to="/ChickenPage" className="btn btn-lg btn-block" style={{ backgroundColor: 'rgb(201, 222, 190)', color: 'white' }}>เมนูนึ่ง</Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link to="/ChickenPage" className="btn btn-lg btn-block" style={{ backgroundColor: 'rgb(201, 222, 190)', color: 'white' }}>เมนูตุ๋น</Link>
            </div>
            <div className="col-md-3 mb-2">
              <Link to="/ChickenPage" className="btn btn-lg btn-block" style={{ backgroundColor: 'rgb(201, 222, 190)', color: 'white' }}>เมนูแกง</Link>
            </div>
            {/* Add links for other categories */}
          </div>
          <div className="row">
            {chickenMenu.map(menu => (
              <MenuContainer
                key={menu.id}
                name={`ชื่อเมนู: ${menu.name}`}
                category={`ประเภทอาหาร: ${menu.category}`}
                calorie={`ปริมาณแคลลรี่: ${menu.calorie}`}
                image={menu.image_url}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading chicken menu...</p>
      )}
    </div>
  );
};

export default ChickenPage;
