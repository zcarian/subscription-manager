import useSWR from 'swr';
import BarChartComponent from '../../components/BarChart';
import Window from '../../components/Window';

export default function Home() {

    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    return (
        <Window> 
            <BarChartComponent apps={apps} />
        </Window>
    );
}
