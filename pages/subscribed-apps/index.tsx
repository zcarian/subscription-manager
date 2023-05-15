import useSWR from 'swr';
import AppPreview from '../../components/AppPreview/AppPreview';

export default function SubscribedAppsPage() {
    const { data } = useSWR('/api/subscribed-apps', { fallbackData: [] });

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Subscribed Apps</h1>
            <ul>
                {data.map((app: any) => (
                    <li key={app._id}>
                        <AppPreview app={app} />
                    </li>
                ))}
            </ul>
        </div>
    );
}