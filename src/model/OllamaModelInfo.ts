
export interface OllamaModelInfoType {
    name: string
    model: string
    size: number
}

export class OllamaModelInfo implements OllamaModelInfoType {
    name: string
    model: string
    size: number

    constructor(name: string, model: string, size: number) {
        this.name = name
        this.model = model
        this.size = size
    }
}