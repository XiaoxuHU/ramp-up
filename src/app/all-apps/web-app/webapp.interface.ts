export interface WebApp {
    id:string,
    kind:string,
    location:string,
    name:string,
    properties:{
        resourceGroup:string,
        name:string,
        state:string
    }
    type:string
}
