export const jsonUnmarshall = (buffer: Uint8Array): { [key: string]: any; } => {
    const jsonString = Buffer.from(buffer).toString('utf8')
    return JSON.parse(jsonString)
}

export const jsonMarshall = (obj: { [key: string]: any; }): string => {
    return JSON.stringify(obj)
}