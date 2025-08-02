import { useState, type SetStateAction } from 'react';
import reactLogo from './assets/WDHCP.jpg'
import './App.css'
import type { MSLResponce } from './MSLResponce.js'
import { fetchHCPData, fetchHCPRequestData } from './getPost.js'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [NPINumber, setNPINumber] = useState('');
  const [zip, setZip] = useState('');
  const [duration, setDuration] = useState('');
  const [contactType, setContactType] = useState<string>('phone');
  const [specialty, setSelectedValue] = useState<string>('family_medicine__v');

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
    setResponseData(null);
  };

  const handleDuration = (event: { target: { value: SetStateAction<string>; }; }) => {
    setDuration(event.target.value);
  };

  type DropdownItem = {
    value: string;
    text: string;
  };
  const handleContactType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setContactType(event.target.value);
  };
  const contactTypeOptions: DropdownItem[] = [
    { value: 'phone', text: 'Phone' },
    { value: 'email', text: 'Email' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setResponseData(null);
  };
  const complexOptions: DropdownItem[] = [
    { value: 'family_medicine__v', text: 'Family Medicine' },
    { value: 'general_practice__v', text: 'General Practice' },
    { value: 'internal_medicine__v', text: 'Internal Medicine' },
    { value: 'pediatrics__v', text: 'Pediatrics' },
  ];

  const [responseData, setResponseData] = useState<MSLResponce | null>(null);
  const [responseRequestData, setResponseRequestData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);


  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);

    try {
      setLoadingRequest(false);
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

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRequest(true);
    setResponseRequestData(null);

    try {
      if (responseData && duration) {
        const request = responseData as unknown as MSLResponce;
        const response = await fetchHCPRequestData(
          request.id,
          email,
          phone,
          name,
          request.accountId,
          NPINumber,
          contactType,
          parseInt(duration, 10))
        setResponseRequestData(response);
      }
      // Adjust based on actual response structure
    } catch (error) {
      console.error('Error sending data:', error);
      setResponseRequestData(null);
    } finally {
      setLoadingRequest(false);
    }
  }
  return (
    <>
      <div>
        <img src={reactLogo} className="logo" alt="HCP logo" />
      </div>
      <div className="container">
        <div className="left-div">
          <h3>Search for MSL</h3>
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
            <label htmlFor="nameInput" className='param'>HCP zipcode: </label>
            <input className='field'
              type="text"
              id="zipInput"
              value={zip}
              onChange={handleZipChange}
            />
          </p>
          <p></p>
          <div>
            <label htmlFor="dropdown">Group Specialty : </label>
            <select className = "dropdown" id="dropdown" value={specialty} onChange={handleChange}>
              <option value={complexOptions[0].value}>{complexOptions[0].text}</option>
              <option value={complexOptions[1].value}>{complexOptions[1].text}</option>
              <option value={complexOptions[2].value}>{complexOptions[2].text}</option>
              <option value={complexOptions[3].value}>{complexOptions[3].text}</option>
            </select>
          </div>
          <p></p>
          <p></p>          
          <p></p>
          <p></p>
          <div>
            <h2>Send Request to search MSL</h2>
            <form onSubmit={handleSearchSubmit}>
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>{!responseData && (
        <div className="right-div">
            <h3>Response: Waiting for search results</h3>
            </div>
          )}
          {responseData && !responseData.id && (
        <div className="right-div">
            <h3>Response: No MSL found based on parameters</h3>
            </div>
          )}
          {responseData && responseData.id && (           
        <div className="right-div">
              <h3>Response:</h3>
              <p>ID: {responseData.id}</p>
              <p >MSL Name: {responseData.name}</p>
              <p >Title: {responseData.title}</p>
              <p >Email: {responseData.email}</p>
              <p >Phone: {responseData.phone}</p>
              <p >Company: {responseData.company}</p>
              <p >Company Id: {responseData.accountId}</p>
              <div>
                <label htmlFor="dropdown">Contact type option : </label>
                <select className = "dropdown"  id="dropdownContactType" value={contactType} onChange={handleContactType}>
                  <option value={contactTypeOptions[0].value}>{contactTypeOptions[0].text}</option>
                  <option value={contactTypeOptions[1].value}>{contactTypeOptions[1].text}</option>
                </select>
              </div>
              <p>
                <label htmlFor="durationInput" className='param'>Duration of the meeting: </label>
                <input className='field'
                  type="number"
                  id="durationInput"
                  value={duration}
                  onChange={handleDuration}
                />
              </p>
              <h2>Send Meeting Request</h2>
              <form onSubmit={handleRequestSubmit}>
                <button type="submit" disabled={loadingRequest}>
                  {loadingRequest ? 'Sending...'
                    : responseRequestData ? 'Request Submitted  : ' + responseRequestData
                      : 'Send Request'}
                </button>
              </form>
            </div>
          )} 
      </div>
    </>
  )
}

export default App
