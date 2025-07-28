import { useState, type SetStateAction } from 'react';
import reactLogo from './assets/WDHCP.jpg'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [NPINumber, setNPINumber] = useState('');
  const [zip, setZip] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPhone(event.target.value);
  };
  
  const handleNPINumberChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setNPINumber(event.target.value);
  };
  
  const handleZipChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setZip(event.target.value);
  };
  
  const handleSpecialtyChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSpecialty(event.target.value);
  };

  return (
    <>
      <div>
        <img src={reactLogo} className="logo" alt="HCP logo" />
      </div>
      <h3>Search for MSL</h3>
      <div>
      <div>
        <p>
          <label htmlFor="nameInput" className='param'>HCP Name: </label>
          <input className='field'
            type="text"
            id="nameInput"
            value={name}
            onChange={handleNameChange}
          />
        </p>
        <p>
          <label htmlFor="nameInput" className='param'>HCP email: </label>
          <input className='field'
            type="text"
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
          />
        </p>
        <p>
          <label htmlFor="nameInput" className='param'>HCP phone: </label>
          <input className='field'
            type="text"
            id="phoneInput"
            value={phone}
            onChange={handlePhoneChange}
          />
        </p>
        <p>
          <label htmlFor="nameInput" className='param'>NPINumber: </label>
          <input className='field'
            type="text"
            id="emailInput"
            value={NPINumber}
            onChange={handleNPINumberChange}
          />
        </p>
        <p>
          <label htmlFor="nameInput" className='param'>HCP zip code: </label>
          <input className='field'
            type="text"
            id="zipInput"
            value={zip}
            onChange={handleZipChange}
          />
        </p>
        <p>
          <label htmlFor="nameInput" className='param'>HCP Specialty: </label>
          <input className='field'
            type="text"
            id="groupSpecialtyInput"
            value={specialty}
            onChange={handleSpecialtyChange}
          />
        </p>
        </div>
        <p>Hello, {name}!</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
