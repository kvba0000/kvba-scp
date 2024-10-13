"use client"

import "./create.css"

import MDEditor, { commands,type MDEditorProps } from "@uiw/react-md-editor"
import { type ChangeEvent, type Dispatch, type SetStateAction, useRef, useState } from "react"

import ScpEntryComponent from "@/components/scpEntryComponent"
import { type ScpEntry, ScpEntryClasses } from "@/types/scp"

const MDEDITOR_PROPS: MDEditorProps = {
    preview: "edit",
    commands: [
        commands.bold, commands.hr, commands.title,
        commands.italic, commands.link, commands.quote,
        commands.strikethrough, commands.code, commands.image,
        commands.table, commands.orderedListCommand, commands.unorderedListCommand
    ],
    extraCommands: [],
    height: "200px",
    className: "md-editor"
}

const CreateForm = ({
    actions: [entry, setEntry]
}: {
    actions: [ScpEntry, Dispatch<SetStateAction<ScpEntry>>]
}) => {
    const inputFile = useRef<HTMLInputElement>(null)
    const downloadElem = useRef<HTMLAnchorElement>(null)

    const [imageUrl, setImageUrl] = useState<string>("")
    const [audioUrl, setAudioUrl] = useState<string>("")

    const clearEntry = (scpEntry: ScpEntry) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const clearObject = (obj: any) => {
            const newObj = { ...obj }
            for (const key of Object.keys(newObj)) {
                if (newObj[key] === "") delete newObj[key]
                if (newObj[key] instanceof Object) {
                    newObj[key] = clearObject(newObj[key])
                    if(Object.keys(newObj[key]).length === 0) delete newObj[key]
                }

            }
            return newObj
        }

        return clearObject(scpEntry)
    }
    
    const updateEntry = (newEntry: ScpEntry) => {
        const scpEntry = clearEntry({ ...entry, ...newEntry })
        setEntry(scpEntry)
    }

    const updateEntryLazy = () => {
        const newEntry: ScpEntry = {
            preview: {
                image: imageUrl,
                audio: audioUrl
            }
        }

        updateEntry(newEntry)
    }

    const copyEntryToClipboard = async () => {
        let didError = false

        const raw = JSON.stringify(entry, null, 2)
        try {
            await navigator.clipboard.writeText(raw)
        } catch (err) {
            console.error("Failed to copy: ", err);
            didError = true
        }
        alert(!didError ? "Item copied to clipboard" : "Failed to copy to clipboard! See console for more info.");
    }

    const saveEntryToFile = () => {
        if (!downloadElem.current) return

        downloadElem.current.href = URL.createObjectURL(new Blob([JSON.stringify(entry, null, 2)], { type: "application/json" }))
        downloadElem.current.download = `${entry.codename}.json`

        downloadElem.current.click()
    }

    const loadEntryFromFile = (ev: ChangeEvent<HTMLInputElement>) => {
        if (!inputFile.current) return
        
        const file = ev.target.files?.[0]
        if (!file) return;
        if (file.type !== "application/json") return alert("Only JSON files are supported")

        const reader = new FileReader()
        reader.onload = ev => {
            const entry: ScpEntry = JSON.parse(ev.target?.result as string)
            setEntry(entry)
            setImageUrl(entry.preview?.image || "")
            setAudioUrl(entry.preview?.audio || "")
        }
        reader.readAsText(file)
    }

    const promptLoadEntryFromFile = () => inputFile.current && inputFile.current.click()

    return <div className="create-form">
        <label>Codename: </label><input value={entry.codename || ""} onChange={e => updateEntry({ ...entry, codename: e.target.value })} />
        <label>Title: </label><input value={entry.title || ""} onChange={e => updateEntry({ ...entry, title: e.target.value })} />
        <label>Class: </label>{ScpEntryClasses.map(c => <label key={c}><input type="radio" name="class" value={c} checked={c === entry.class} onChange={() => updateEntry({ ...entry, class: c })} /> {c}</label>)}
        <label>Special Containment Procedures (Supports Markdown): </label><MDEditor {...MDEDITOR_PROPS} value={entry.specialContainmentProcedures || ""} onChange={e => updateEntry({ ...entry, specialContainmentProcedures: e })} />
        <label>Description (Supports Markdown): </label><MDEditor {...MDEDITOR_PROPS} value={entry.description || ""} onChange={e => updateEntry({ ...entry, description: e })} />
        <label>Notes (Supports Markdown): </label><MDEditor {...MDEDITOR_PROPS} value={entry.notes || ""} onChange={e => updateEntry({ ...entry, notes: e })} />
        <label>Preview Image: </label><input type="url" value={imageUrl} onBlur={updateEntryLazy} onChange={e => setImageUrl(e.target.value)} />
        <label>Preview Audio: </label><input type="url" value={audioUrl} onBlur={updateEntryLazy} onChange={e => setAudioUrl(e.target.value)} />
        <br />
        <button onClick={copyEntryToClipboard}>Copy to Clipboard</button>
        <button disabled={!entry.codename} onClick={saveEntryToFile}>Save to File</button>
        <button onClick={promptLoadEntryFromFile}>Load from File</button>
        <input onChange={loadEntryFromFile} type="file" ref={inputFile} style={{ display: "none" }} />
        <a ref={downloadElem} style={{ display: "none" }}></a>
    </div>
}

export default function CreateEntry() {
    const [ entry, setEntry ] = useState<ScpEntry>({})
    const [ showPreview, setShowPreview ] = useState(false)

    return <>
        <div style={{ marginBottom: "20px" }}>
            <h1>Create Entry</h1>
            <span>Create your own SCP entry page and then you can suggest it <a title="GitHub issues page" href="https://github.com/kvba0000/kvba-scp/issues">here</a>. Maybe it will be added in the future.</span>
        </div>

        <div className="create-page">
            <CreateForm actions={[entry, setEntry]} />
            <div className={["create-preview", showPreview ? "active" : ""].join(" ")}>
                <div className="preview-actions">
                    <span>Preview:</span>
                    <button onClick={() => setShowPreview(!showPreview)} className="show-preview-btn">{showPreview ? "Hide" : "Show"}</button>
                </div>
                <div className="preview-container">
                    <ScpEntryComponent entry={entry} />
                </div>
            </div>
        </div>
    </>
}