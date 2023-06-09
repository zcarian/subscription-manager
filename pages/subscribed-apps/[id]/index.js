import { useRouter } from 'next/router.js';
import useSWR from 'swr';
import AppDetails from '../../../components/AppDetails';

export default function DetailsPage() {

    
    const router = useRouter();
    const { isReady, push, query } = router;
    const { id } = query;
    
    const { data:app, isLoading, error } = useSWR(isReady ? `/api/subscribed-apps/${id}` : null);
    
    if (!isReady || isLoading || error) return <></>;
    
    async function handleDeleteApp() {
        const confirmation = confirm("Are you sure you want to delete this app?");

        if (!confirmation) return;
        
        push("/subscribed-apps");
        
        await fetch(`/api/subscribed-apps/${id}`, {
            method: "DELETE",
        });
    }

    return (
        <AppDetails app={app} deleteApp={handleDeleteApp}/>  
    );
}