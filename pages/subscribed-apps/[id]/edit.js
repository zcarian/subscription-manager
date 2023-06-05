import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../../components/Form';
import Window from '../../../components/Window';

export default function EditPage() {

    const router = useRouter();
    const { isReady, push,  query } = router;
    const { id } = query;
    
    const { data:appData, isLoading, error } = useSWR(isReady ? `/api/subscribed-apps/${id}` : null);
    
    if (!isReady || isLoading || error) return <h2>Loading...</h2>;
    
    async function editApp(appData) {
        await fetch(`/api/subscribed-apps/${id}`, {
            method: "PATCH",
            body: JSON.stringify(appData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        push(`/subscribed-apps/${id}`);
    }
    return (
        <Window>
            <Form onSubmit={editApp} appData={appData}/>
        </Window>
    )
}