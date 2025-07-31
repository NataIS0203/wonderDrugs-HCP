import { useState, type SetStateAction } from 'react';
import reactLogo from './assets/WDHCP.jpg'
import './App.css'
import type { MSLResponce } from './MSLResponce.js'
import { fetchHCPData } from './getPost.js'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [NPINumber, setNPINumber] = useState('');
  const [zip, setZip] = useState('');

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

  type DropdownItem = {
    value: string;
    text: string;
  };

  const [specialty, setSelectedValue] = useState<string>('option1');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log('Selected:', event.target.value);
  };
  const complexOptions: DropdownItem[] = [
    { value: 'family_medicine__v', text: 'Family Medicine' },
    { value: 'general_practice__v', text: 'General Practice' },
    { value: 'internal_medicine__v', text: 'Internal Medicine' },
    { value: 'pediatrics__v', text: 'Pediatrics' },
  ];

  const [responseData, setResponseData] = useState<MSLResponce | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);

    try {
      const response = await fetchHCPData(zip, specialty)
      setResponseData(response);
      // Adjust based on actual response structure
    } catch (error) {
      console.error('Error sending data:', error);
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  }

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
              id="NPINumber"
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
          <p></p>
          <p></p>
          <div>
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" value={specialty} onChange={handleChange}>
              <option value={complexOptions[0].value}>{complexOptions[0].text}</option>
              <option value={complexOptions[1].value}>{complexOptions[1].text}</option>
              <option value={complexOptions[2].value}>{complexOptions[2].text}</option>
              <option value={complexOptions[3].value}>{complexOptions[3].text}</option>
            </select>
          </div>
        </div>
        <div>
          <h2>Send Input to API</h2>
          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
          {responseData && (
            <div>
              <h3>Response:</h3>
              <ul><li key={responseData.id}>{responseData.id}</li>
                <li key={responseData.name}>{responseData.name}</li>
                <li key={responseData.title}>{responseData.title}</li>
                <li key={responseData.email}>{responseData.email}</li>
                <li key={responseData.phone}>{responseData.phone}</li>
                <li key={responseData.company}>{responseData.company}</li></ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
