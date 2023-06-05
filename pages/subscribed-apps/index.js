import useSWR from 'swr';
import AppList from '../../components/AppList';
import Window from '../../components/Window';
import WindowButtons from '../../components/WindowButtons';

const buttons =[
  {
    name:'Add new app',
    path:'/add/form',
    icon:'/type.png'
  },
  {
    name:'Check your emails',
    path:'/add/email',
    icon:'/scan1.png'
  }
]

export default function SubscribedAppsPage() {
    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps

    if (isLoading) return <div>Loading...</div>;

    if (!data) return <div>Please log in.</div>;


    if(data.apps.length === 0) return <div>You have no subscribed apps.</div>
    
    return (
        <Window areButtons={true} isMirrored={false} buttons={buttons}>
            <AppList apps={apps}/>
            {/* <WindowButtons isMirrored={false} buttons={buttons}/> */}
        </Window>
    );
}