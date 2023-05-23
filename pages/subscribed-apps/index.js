import useSWR from 'swr';
import AppPreview from '../../components/AppPreview/AppPreview';

export default function SubscribedAppsPage() {
    const { data } = useSWR('/api/subscribed-apps');

    // console.log("data in subscribed-apps/index.js", data);
    
    const apps = data?.apps

    // console.log("apps in subscribed-apps/index.js", apps);

    if (!data) return <div>Please log in.</div>;

    if(data.apps.length === 0) return <div>You have no subscribed apps.</div>
    
    return (
        <div>
            <h1>Subscribed Apps</h1>
            <ul>
                {apps.map((app) => (
                    <li key={app._id}>
                        <AppPreview app={app} />
                    </li>
                ))}
            </ul>
        </div>
    );
}