import { SensorEvaluation } from "./sensorEvaluation";

export interface Output {
    [sensorName: string]: SensorEvaluation
}