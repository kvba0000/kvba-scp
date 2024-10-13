"use client"

import "./notfound.css"

import { useGlitch } from "react-powerglitch"

export default function NotFound() {
    const glitch = useGlitch()

    return <div className="notfound">
        <h1 ref={glitch.ref}>There might have been an anomaly.</h1>
        <span>We could not find the page specified by you. Try again later.</span>
        <div className="notfound-actions">
            <button onClick={() => window.history.back()}>Go back</button>
            <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
    </div>
}