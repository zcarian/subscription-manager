import styled from "styled-components";
import useAppDataSearch from "../../hooks/useAppDataSearch";
import { useEffect, useState } from "react";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px;
  `

const Label = styled.label`
  font-weight: bold;
  `;

const StyledButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  `

export default function Form({ onSubmit, appData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: '',
    startDate: '',
    endDate: '',
    renewPeriod: '',
    icon: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedAppData, setSearchedAppData] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await fetch(`/api/proxy?searchTerm=${encodeURIComponent(searchTerm)}`);

        if (!response.ok) {
          throw new Error('Error fetching app data');
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const body = doc.querySelector('body');

        let appLink, appIcon, appName;

        if (body.querySelector('.DxDVjd')) {
          appLink = body.querySelector('.DxDVjd');
          appIcon = appLink.querySelector('img').getAttribute('src');
          appName = appLink.querySelector('.vWM94c').textContent;
          setSearchedAppData([{ name: appName, icon: appIcon }]);
        } else {
          const appLinks = body.querySelectorAll('.fUEl2e .j2FCNc');
  
          const appData = Array.from(appLinks) 
            .slice(0, 5)
            .map((appLink) => {
              appIcon = appLink.querySelector('img').getAttribute('src');
              appName = appLink.querySelector('.DdYX5').textContent;
  
              return { name: appName, icon: appIcon };
            });
  
          setSearchedAppData(appData);
        }
      } catch (error) {
        console.error(error);
        setSearchedAppData([]);
      } 
    };
    if (searchTerm) {
      fetchAppData();
    } else {
      setSearchedAppData([]);
    }
  }, [searchTerm]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSearchTerm(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      name: suggestion.name,
      icon: suggestion.icon,
    }));
    console.log(formData);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <FormContainer aria-labelledby="add-new-app" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleNameChange} required/>

      {searchedAppData && searchTerm !== "" && (
        <ul>
        {searchedAppData.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.name} <img src={suggestion.icon} alt={suggestion.name} />
          </li>
        ))}
      </ul>
      )}

      <Label htmlFor="price">Price</Label>
      <input type="number" id="price" name="price" min={0} onChange={handleInputChange} value={formData.price} required />

      <Label htmlFor="currency">Currency</Label>
      <select id="currency" name="currency" onChange={handleInputChange} value={formData.currency} required>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>

      <Label htmlFor="startDate">Start Date</Label>
      <input type="date" id="startDate" name="startDate" onChange={handleInputChange} value={formData.startDate} required />

      <Label htmlFor="endDate">End Date</Label>
      <input type="date" id="endDate" name="endDate" onChange={handleInputChange} value={formData.endDate} />

      <Label htmlFor="renewPeriod">Renew Period</Label>
      <select id="renewPeriod" name="renewPeriod" onChange={handleInputChange} value={formData.renewPeriod} required>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="other">Other</option>
      </select>

      <StyledButton type="submit">{appData ? "Edit app" : "Add app"}</StyledButton>
    </FormContainer>
  );
}
