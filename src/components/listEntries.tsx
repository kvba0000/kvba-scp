import { glob } from "glob"
import Link from "next/link";
import { basename, dirname, join } from "path";

const ENTRIES_PATH = join(process.cwd(), 'src/entries')


type ListEntries = { [key: string]: string[] }

export const getEntries = async (): Promise<ListEntries> => {
  const entries = (await glob(join(ENTRIES_PATH, "**/*.json")))
    .reduce((acc: ListEntries, path: string) => {
        const categoryName = basename(dirname(path))
        const name = basename(path)

        if(!acc[categoryName]) acc[categoryName] = []

        acc[categoryName].push(name)
        return acc
    }, {})

    return entries
}

type ListEntriesProps = { entries: ListEntries }
export default function ListEntriesComponent({ entries }: ListEntriesProps) {
  return <ul>
    {Object.entries(entries).map(([category, entries], i) => {
        return <li key={`category-${i}`}>
                <Link href={`/entries/${category}`}>{category}</Link>
                {entries.length > 1 && <ul>
                    {entries.filter(entry => entry !== "-.json").map((entry, i) => {
                        const entryName = `${category}-${entry.replace('.json', '')}`

                        return <li key={`entry-${i}`}>
                            <Link href={`/entries/${entryName}`}>{entryName}</Link>
                        </li>
                    })}
                </ul>}
        </li>
    })}
  </ul>
}