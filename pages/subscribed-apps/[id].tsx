import { useRouter } from 'next/router.js';
import useSWR from 'swr';
import AppDetails from '../../components/AppDetails/AppDetails';

export default function DetailsPage() {
    const router = useRouter();
    const { isReady, query } = router;
    const { id } = query;

    const { data:app, isLoading, error } = useSWR(isReady ? `/api/subscribed-apps/${id}` : null);

    if (!isReady || isLoading || error) return <h2>Loading...</h2>;

    return (
        <AppDetails app={app} />
    );
}