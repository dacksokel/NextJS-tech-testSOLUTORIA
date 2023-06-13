// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}

export interface Uf {
    id: number
    nombreIndicador: string
    codigoIndicador: string
    unidadMedidaIndicador: string,
    valorIndicador: number,
    fechaIndicador: string,
    tiempoIndicador?: string,
    origenIndicador?: string
}
