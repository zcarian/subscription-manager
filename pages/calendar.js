import useSWR from 'swr';
import AppCalendar from '../components/Calendar';
import Window from '../components/Window';

export default function Home() {

    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    return (
        <Window> 
            <AppCalendar apps={apps} />
        </Window>
    );
}
