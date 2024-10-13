type ScpEntryPreview = {
    image?: string,
    audio?: string
}

export const ScpEntryClasses = ["Safe", "Euclid", "Keter", "Thaumiel"] as const

type ScpEntryClass = typeof ScpEntryClasses[number]

export type ScpEntry = {
    preview?: ScpEntryPreview,
    codename?: string,
    title?: string,
    class?: ScpEntryClass,
    specialContainmentProcedures?: string,
    description?: string,
    notes?: string
}