import useSWR from 'swr';

export default function SubscribedAppsPage() {
    const { data } = useSWR('/api/subscribed-apps', { fallbackData: [] });

    console.log(data);
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Subscribed Apps</h1>
            <ul>
                {data.map((app: any) => (
                    <li key={app._id}>
                        <h2>{app.name}</h2>
                        <p>{app.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}