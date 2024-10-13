

import Link from "next/link";

import ListEntriesComponent, { getEntries } from "@/components/listEntries";


export default async function Home() {
  const entries = await getEntries()

  return <>
      <h1>Anomalies: <Link href="/entries/create">[SUGGEST]</Link></h1>
      <span>Anomalies found by the unofficial branch of SCP Foundation:</span>
      <ListEntriesComponent entries={entries} />
  </>
}