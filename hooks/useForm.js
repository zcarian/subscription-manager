import { useState, useEffect } from "react";

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    formData,
    handleInputChange,
    setFormData,
  };
};

export const useFetchAppData = (searchTerm) => {
  const [searchedAppData, setSearchedAppData] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await fetch(`/api/searchbox?term=${searchTerm}&num=1`);
        const data = await response.json();
        setSearchedAppData(data);
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

  return searchedAppData;
};

export const useSuggestions = () => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  return {
    isSuggestionsOpen,
    setIsSuggestionsOpen,
  };
};
