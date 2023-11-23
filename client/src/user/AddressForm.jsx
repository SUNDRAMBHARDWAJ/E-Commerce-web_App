import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './AddressForm.module.css';

const AddressForm = () => {
const history = useNavigate();
  const [street, setstreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e) => {
    console.log('Order placed:', { street, city, state, zipCode });
    localStorage.setItem('Address',JSON.stringify({ street, city, state, zipCode }))
    history('/payment')
};

  return (
    <div className={style.container}>
    <div className={style.addressForm} onSubmit={handleSubmit}>
        <h2>Confirm Your Address Details</h2>
      <label htmlFor="street-address">Street Address:</label>
      <input
        type="text"
        id="street-address"
        value={street}
        onChange={(e) => setstreet(e.target.value)}
        required
      />

      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />

      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />

      <label htmlFor="zip-code">Zip Code:</label>
      <input
        type="text"
        id="zip-code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />

      <button 
      onClick={handleSubmit}
      >Place Order</button>
    </div>
    </div>
  );
};

export default AddressForm;
