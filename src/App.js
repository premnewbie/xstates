import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [countryList,setCountryList] = useState();
  const [stateList,setStateList] = useState();
  const [cityList,setCityList] = useState();
  const [selectedCountry,setSelectedCountry] = useState();
  const [selectedState,setSelectedState] = useState();
  const [selectedCity,setSelectedCity] = useState();

  useEffect(() => {
    axios.get('https://crio-location-selector.onrender.com/countries').then((res) => setCountryList(res.data))
    .catch(e => console.log('Error ',e))
  },[])

  useEffect(() => {
    if(selectedCountry){
      setSelectedState('');
      axios.get(` https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((res) => setStateList(res.data))
      .catch(e => console.log('Error ',e))
    }
  },[selectedCountry])

  useEffect(() => {
    if(selectedState){
      setSelectedCity('');
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
      .then((res) => setCityList(res.data))
      .catch(e => console.log('Error ',e))
    }
  },[selectedState])

  const handleCity = (city) => {
    setSelectedCity(city);
  }


  return (
    <div className="App">
      <h1>Select Location</h1>
      <select defaultValue='Select Country' onInput={(e)=>setSelectedCountry(e.target.value)}>
        <option value='Select Country' disabled>Select Country</option>
        {countryList?.map((country) => (<option value={country}>{country}</option>))}
      </select>
      {!selectedCountry && <select defaultValue='Select State' disabled>
        <option value='Select State' disabled>Select State</option>
      </select>}
      {selectedCountry && <select defaultValue='Select State' onInput={(e)=>setSelectedState(e.target.value)}>
        <option value='Select State' disabled>Select State</option>
        {stateList?.map((state) => (<option value={state}>{state}</option>))}
      </select>}
      {!selectedState && <select defaultValue='Select City' disabled>
        <option value='Select City' disabled>Select City</option>
      </select>}
      {selectedState && <select defaultValue='Select City' onInput={(e)=>handleCity(e.target.value)}>
        <option value='Select City' disabled>Select City</option>
        {cityList?.map((city) => (<option value={city}>{city}</option>))}
      </select>}
      {selectedCountry && selectedState && selectedCity && <p>You seleted {selectedCountry}, {selectedState}, {selectedCity}</p>}
    </div>
  );
}

export default App;
