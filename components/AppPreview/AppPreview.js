import Link from "next/link";

export default function AppPreview({app}) {
    const { name, price, currency, _id, icon } = app;

    return (
        <div>
            <Link href={`/subscribed-apps/${_id}`}>
                <img src={icon} alt={`${name} icon`}/>
                <h2>{name}</h2>
                <h3>{price} {currency}</h3>
            </Link>
        </div>
    );
}