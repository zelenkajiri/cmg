// when adding new sensor, we also have to fix reference creation in parseData
export interface Reference {
    thermometer?: number;
    hygrometer?: number;
    CO?: number;
}