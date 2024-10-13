"use client"

import "./scpEntryComponent.css"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { ScpEntry } from "@/types/scp";


const MarkdownRenderer = ({ children }: { children: string }) => <ReactMarkdown
        components={{
            a: ({ href, title, children: c }) => <Link href={href || ""} title={title || ""}>{c}</Link>,
        }}
    >{children}</ReactMarkdown>

export default function ScpEntryComponent({ entry }: { entry: ScpEntry }) {
    const {
        codename,
        title,
        class: objectClass,
        specialContainmentProcedures,
        preview,
        description,
        notes
    } = entry;
    const [ errorImage, setErrorImage ] = useState(false)

    return <>
        <div className="entity-title">
            <div>
                <h1>{codename || "[REDACTED]"} - &quot;{title || "-"}&quot;</h1>
                <span className="text-section"><b>Item #: </b>{codename || "[REDACTED]"}</span>
                <span className="text-section"><b>Object Class: </b>{objectClass || "[REDACTED]"}</span>
                {specialContainmentProcedures && <span className="text-section"><b>Special Containment Procedures: </b><MarkdownRenderer>{specialContainmentProcedures}</MarkdownRenderer></span>}
            </div>
            {preview && <div className="entity-preview">
                {preview.image && <a title="Preview of the entity" target="_blank" href={`/img/entities/${preview.image}`}>
                    <Image onError={() => setErrorImage(true)} onLoad={() => setErrorImage(false)} style={{ display: errorImage ? "none" : "block" }} className="preview" alt="Preview of the entity" src={`/img/entities/${preview.image}`} height={300} width={300} />
                </a>}
                {preview.audio && <audio controls>
                    <source src={`/audio/entities/${preview.audio}`} />
                    Your browser does not support audio preview.
                </audio>}
            </div>}
        </div>
        <span className="text-section"><b>Description: </b><MarkdownRenderer>{description || "[REDACTED]"}</MarkdownRenderer></span>
        {notes && <span className="text-section"><b>Notes: </b><MarkdownRenderer>{notes}</MarkdownRenderer></span>}
    </>
}