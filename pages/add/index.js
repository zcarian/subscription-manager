import Form from "../../components/Form";
import { useRouter } from "next/router";

export default function AddEntryPage() {
    const router = useRouter();

    async function addApp(entryData) {
        const response = await fetch("/api/subscribed-apps", {
            method: "POST",
            body: JSON.stringify(entryData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            await response.json();
            router.push("/subscribed-apps");
        }
    }


    return (
        <main>
            <h1>Add New App</h1>
            <Form onSubmit={addApp} />
        </main>
    )
}