import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [formData, setFormData] = useState( appData || {
    name: '',
    price: '',
    currency: 'EUR',
    startDate: '',
    endDate: '',
    renewPeriod: 'daily',
    icon: '',
    category: 'Entertainment',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedAppData, setSearchedAppData] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);


  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await fetch(`/api/test?term=${searchTerm}&num=1`);
        const data = await response.json();
        setSearchedAppData(data);
      }catch (error) {
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

  console.log('searchedAppData:',searchedAppData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSearchTerm(value);
    setIsSuggestionsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      name: suggestion.title,
      icon: suggestion.icon,
    }));
    setIsSuggestionsOpen(false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <FormContainer aria-labelledby="add-new-app" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleNameChange} required/>

      {isSuggestionsOpen && searchedAppData && searchTerm !== "" && (
        <ul>
        {searchedAppData.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.title} 
            {suggestion.icon && <Image src={suggestion.icon} alt="halo" height={100}
            width={100}/> }
          </li>
        ))}
      </ul>
      )}

      <Label htmlFor="price">Price</Label>
      <input type="number" id="price" name="price" min={0} onChange={handleInputChange} value={formData.price} required />

      <Label htmlFor="currency">Currency</Label>
      <select id="currency" name="currency" onChange={handleInputChange} value={formData.currency} required>
        <option value="PLN">PLN</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
      </select>

      <Label htmlFor="category">Category</Label>
      <select id="category" name="category" onChange={handleInputChange} value={formData.category} required>
        <option value="Entertainment">Entertainment</option>
        <option value="Education">Education</option>
        <option value="Utilities">Utilities</option>
        <option value="Productivity">Productivity</option>
        <option value="Finance">Finance</option>
        <option value="Music">Music</option>
        <option value="Other">Other</option>
      </select>

      <Label htmlFor="renewPeriod">Renew Period</Label>
      <select id="renewPeriod" name="renewPeriod" onChange={handleInputChange} value={formData.renewPeriod} required>
        <option value="daily" >Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly" >Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="">Other</option>
      </select>
      {formData.renewPeriod === "" && (
        <input type="text" id="renewPeriod" name="renewPeriod" placeholder="" onChange={handleInputChange} value={formData.renewPeriod} />
        )}

      <Label htmlFor="startDate">Start Date</Label>
      <input type="date" id="startDate" name="startDate" onChange={handleInputChange} value={formData.startDate} required />
  
      <Label htmlFor="endDate">End Date</Label>
      <input type="date" id="endDate" name="endDate" onChange={handleInputChange} value={formData.endDate} />

      <StyledButton type="submit">{appData ? "Edit app" : "Add app"}</StyledButton>
    </FormContainer>
  );
}
