import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import { useForm, useFetchAppData, useSuggestions } from "../../hooks/useForm";

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
  const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  `

const StyledListItem = styled.li`
  height: auto;
  border: 5px solid #0078D7;
  font-family: 'Tahoma', sans-serif;
  display: flex;
  align-items: center;
  background-color: #d3e5fb;
  cursor: pointer;
  `

const SuggestionIcon = styled(Image)`
  border-right: 5px solid #0078D7;
`
const SuggestionName = styled.p`
  padding: 10px;
  margin: 0;
  `

export default function Form({ onSubmit, appData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { formData, handleInputChange, setFormData } = useForm(appData || {
    name: '',
    price: '',
    currency: 'EUR',
    startDate: '',
    endDate: '',
    renewPeriod: 'daily',
    icon: '',
    category: 'Entertainment',
  });

  const searchedAppData = useFetchAppData(searchTerm);
  const { isSuggestionsOpen, setIsSuggestionsOpen } = useSuggestions();

  const handleNameChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if(searchedAppData.length !== 0) {
      setFormData((prevData) => ({
        ...prevData,
        name: value,
        icon: searchedAppData[0].icon,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        name: value,
      }));
    }
    setIsSuggestionsOpen(true);
    // console.log(searchedAppData)
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
    if(isSuggestionsOpen) {
      setFormData((prevData) => ({
        ...prevData,
        name: searchedAppData[0].title,
        icon: searchedAppData[0].icon,
      }));
    }
    onSubmit(formData);
  }
  return (
    <FormContainer aria-labelledby="add-new-app" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleNameChange} autoComplete="off" required/>

      {isSuggestionsOpen && searchedAppData && searchTerm !== "" && (
        <StyledList>
        {searchedAppData.map((suggestion, index) => (
          <StyledListItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.icon && <SuggestionIcon src={suggestion.icon} alt={`${suggestion.title}`} height={40}
            width={45}/> }
            <SuggestionName>
              {suggestion.title}
            </SuggestionName>
          </StyledListItem>
        ))}
      </StyledList>
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
