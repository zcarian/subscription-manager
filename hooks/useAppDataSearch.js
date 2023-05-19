import { useState, useEffect } from 'react';

export default function useAppDataSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedAppData, setSearchedAppData] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  return { searchTerm, searchedAppData, handleChange, setSearchTerm };
}
