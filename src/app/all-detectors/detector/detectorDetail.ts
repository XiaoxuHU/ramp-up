export interface DetectorDetail {
    id: string,
    name:string,
    properties:{
        metadata:{
            id:string,
            name:string,
            description:string,
            category:string
        },
        dataset: DatasetItem[]
        status:{
            statusId:number
        }
    }
}

export interface DatasetItem {
    table:{
        tableName:string,
        columns:ColumnItem[]
        rows:string[][]
    }
    renderingProperties:{
        type:string,
        title:string,
        description:string
    }
}

interface ColumnItem {
    columnName:string,
    dataType:string,
    columnType:string
}