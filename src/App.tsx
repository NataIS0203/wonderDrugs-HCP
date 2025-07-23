import { useState, type SetStateAction } from 'react'
import reactLogo from './assets/WDHCP.jpg'
import './App.css'

function App() {
   const [name, setName] = useState('');

  const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };


  return (
    <>
      <div>
          <img src={reactLogo} className="logo" alt="HCP logo" />
      </div>
      <h1>Wonder Drugs HCP</h1>
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleNameChange}
        />
      <p>Hello, {name}!</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
