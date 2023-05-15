import { useRouter } from "next/router";

export default function AppDetails({app}) {
    const router = useRouter();

    return (
        <div>
            <h1>{app.name}</h1>
            <h2>{app.price} {app.currency} piad {app.renewPeriod}</h2>
            <p>Started on: {app.startDate} {app.endDate ?`finish on: ${app.endDate}`:""}</p>
            <button onClick={() => router.push("/subscribed-apps/")}>Back</button>
        </div>
    );
}