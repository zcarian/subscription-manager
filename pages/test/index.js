import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
    const [apps, setApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchApps = async () => {
        const response = await fetch(`/api/test?term=${searchTerm}&num=1`);
        const data = await response.json();
        setApps(data);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        fetchApps();
    };

    console.log(apps);
    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
            <button onClick={handleSearchClick}>Search</button>
            <ul>
                {apps.map((app, index) => (
                    <li key={index}>
                      {app.title}
                      <Image src={app.icon} alt={app.title} width={100} height={100} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
