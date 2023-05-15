import Link from "next/link";

export default function Home() {
  return (
      <main>
        <h1>Hello</h1>
        <Link href="/add">Add New App</Link>        
      </main>
  );
}
