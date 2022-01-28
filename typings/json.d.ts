declare module "config.json"{
    export const mongoPath:string
    export const prefix:string
    export const nodes:node[]
}
type node={
    id:string,
    host:string,
    port:string,
    password:string

}