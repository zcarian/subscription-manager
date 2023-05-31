import useSWR from 'swr';
import AppCalendar from '../components/Calendar';

export default function Home() {

    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    return (
        <AppCalendar apps={apps} />
    );
}
