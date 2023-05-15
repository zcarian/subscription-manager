'use client';
import Form from "@/components/Form/Form";
import { useRouter } from "next/router";

export default function AddEntryPage() {
    // const router = useRouter();

    async function addApp(entryData) {
        const response = await fetch("/api/add", {
            method: "POST",
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await response.json();
            // router.push("/");
        }
    }


    return (
        <main>
            <h1>Add New App</h1>
            <Form onSubmit={addApp}/>
        </main>
    )
}