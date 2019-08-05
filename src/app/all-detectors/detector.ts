export interface Detector {
    name:string,
    id:string,
    properties: {
        metadata: {
            name: string,
            category: string,
            description: string
        }
    }
}
