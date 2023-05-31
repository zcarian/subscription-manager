import { useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import AppCalendar from '../../components/Calendar';

export default function Home() {

    const { data, isLoading } = useSWR('/api/subscribed-apps');

    const apps = data?.apps
    // console.log('apps:',apps)

    if (isLoading) return <div>Loading...</div>;

    return (
        <AppCalendar apps={apps} />
    );
}
