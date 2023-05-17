import styled from "styled-components";
import useAppDataSearch from "../../hooks/useAppDataSearch";

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

export default function Form({onSubmit, appData}) {

  const {name, price, currency, startDate, endDate, renewPeriod } = appData ?? {};

  const { searchTerm, searchedAppData, handleChange } = useAppDataSearch();

    function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      onSubmit(data);
    }   

    return (
    <FormContainer aria-labelledby="add-new-app" onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <input type="text" id="name" name="name" defaultValue={name}  value={searchTerm} onChange={handleChange} required />
        {searchedAppData && searchTerm!="" && (
        <div>
          <h2>{searchedAppData.name}</h2>
          <img src={searchedAppData.icon} alt={searchedAppData.name} />
        </div>
      )}

        <Label htmlFor="price">Price</Label>
        <input type="number" id="price" name="price" min={0} defaultValue={price} required />

        <Label htmlFor="currency">Currency</Label>
        <select id="currency" name="currency" defaultValue={currency} required>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </select>

        <Label htmlFor="startDate">Start Date</Label>
        <input type="date" id="startDate" name="startDate" defaultValue={startDate} required />

        <Label htmlFor="endDate">End Date</Label>
        <input type="date" id="endDate" name="endDate" defaultValue={endDate} />

        <Label htmlFor="renewPeriod">Renew Period</Label>
        <select id="renewPeriod" name="renewPeriod" defaultValue={renewPeriod} required>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="other">Other</option>
        </select>
        <StyledButton type="submit">Add App</StyledButton>
    </FormContainer>

    )
}