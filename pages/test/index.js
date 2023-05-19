import { useState } from 'react';

const suggestions = [
  { name: 'App 1', icon: 'icon1' },
  { name: 'App 2', icon: 'icon2' },
  { name: 'App 3', icon: 'icon3' },
  // Add more suggestions here
];

const AppForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: '',
    startDate: '',
    endDate: '',
    renewPeriod: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      name: suggestion.name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data and perform further actions
    console.log(formData);
    // Reset form
    setFormData({
      name: '',
      price: '',
      currency: '',
      startDate: '',
      endDate: '',
      renewPeriod: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>
        Currency:
        <input
          type="text"
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>
        Start Date:
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>
        End Date:
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <label>
        Renew Period:
        <input
          type="text"
          name="renewPeriod"
          value={formData.renewPeriod}
          onChange={handleInputChange}
          required
        />
      </label>
      <br />

      <label>Suggestions:</label>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.name} <img src={suggestion.icon} alt={suggestion.name} />
          </li>
        ))}
      </ul>

      <button type="submit">Add App</button>
    </form>
  );
};

export default AppForm;
