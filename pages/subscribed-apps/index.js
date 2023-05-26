import useSWR from 'swr';
import AppList from '../../components/AppList/AppList';

export default function SubscribedAppsPage() {
    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    if (!data) return <div>Please log in.</div>;


    if(data.apps.length === 0) return <div>You have no subscribed apps.</div>
    
    return (
        <div>
            <AppList apps={apps}/>
        </div>
    );
}