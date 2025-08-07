import { useState, type SetStateAction } from 'react';
import reactLogo from './assets/WDHCP.jpg'
import './App.css'
import type { MSLResponce } from './MSLResponce.js'
import { fetchHCPData, fetchHCPRequestData } from './getPost.js'

function App() {
  const [name, setName] = useState('Natalya Sniff');
  const [email, setEmail] = useState('natais@proton.com');
  const [phone, setPhone] = useState('5679878888');
  const [NPINumber, setNPINumber] = useState('10034005');
  const [zip, setZip] = useState('30701');
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
    setResponseRequestData(null);
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
    { value: 'face_to_face__v', text: 'In-person' },
    { value: 'phone', text: 'Phone' },
    { value: 'video_v', text: 'Video' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setResponseData(null);
    setResponseRequestData(null);
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
          <h3>Enter the required information<br/>to locate your Medical Science Liaison</h3>
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
            <label htmlFor="nameInput" className='param'>Zip Code: </label>
            <input className='field'
              type="text"
              id="zipInput"
              value={zip}
              onChange={handleZipChange}
            />
          </p>
          <p></p>
          <div>
            <label htmlFor="dropdown">Therapeutic area : </label>
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
            <form onSubmit={handleSearchSubmit}>
              <button className= 'buttons' type="submit" disabled={loading}>
                {loading ? 'Searching for Medical Science Liaison' : 'Locate Medical Science Liaison'}
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
            <h3>Response: No  Medical Science Liaison<br/> found in selected area</h3>
            </div>
          )}
          {responseData && responseData.id && (           
        <div className="right-div">
              <h3>Your Medical Science Liaison is:</h3>
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
                  <option value={contactTypeOptions[2].value}>{contactTypeOptions[2].text}</option>
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
              <form onSubmit={handleRequestSubmit}>
                <button className= 'buttons' type="submit" disabled={responseRequestData !== null || loadingRequest}>
                  {loadingRequest ? 'Sending...'
                    : responseRequestData ? 'Request Submitted  : ' + responseRequestData
                      : 'Submit Meeting Request'}
                </button>
              </form>
            </div>
          )} 
      </div>
    </>
  )
}

export default App
