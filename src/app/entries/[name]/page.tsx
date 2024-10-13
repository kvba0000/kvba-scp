import { readFile } from "fs/promises"
import type { Metadata } from "next"
import { join } from "path"

import { getEntries } from "@/components/listEntries"
import ScpEntryComponent from "@/components/scpEntryComponent"
import type { ScpEntry } from "@/types/scp"

export async function generateStaticParams(): Promise<{ name: string }[]> {
    const entries = await getEntries()

    return Object.entries(entries).map(([category, entries]) => {
        return entries.map(n => ({ name: n === "-.json" ? category : `${category}-${n.replace(".json", "")}` }))
    }).flat()
}

const buildEntryPath = ({ category, name }: { category: string, name: string }) => join(process.cwd(), "src/entries", `SCP-${category}`, `${name}.json`)

const parseEntryName = ({ entryName }: { entryName: string }): [ string, string ] => {
    const [ category, name ] = entryName.replace("SCP-", "").split("-")
    return [category, name]
}

const getEntryData = async ({ category, name }: { category: string, name?: string }): Promise<ScpEntry> => {
    if(!name) name = "-"

    const path = buildEntryPath({ category, name })
    return JSON.parse(
        await readFile(path, "utf-8")
    )
}


type Props = {
    params: {
        name: string
    }
}

export async function generateMetadata({ params: { name: entryName } }: Props): Promise<Metadata> {
    const [ category, name ] = parseEntryName({ entryName })
    const entry = await getEntryData({ category, name })

    const title = `${entry.codename || "[REDACTED]"} - "${entry.title || "[REDACTED]"}"`
    const description = entry.description || "[REDACTED]"

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: entry.preview?.image ? [ `/img/entities/${entry.preview.image}` ] : undefined
        },
        twitter: {
            card: "summary_large_image"
        }
    }
}

export default async function Entry({ params: { name: entryName } }: Props) {
    const [ category, name ] = parseEntryName({ entryName })
    const entry = await getEntryData({ category, name })

    return <ScpEntryComponent entry={entry} />
}