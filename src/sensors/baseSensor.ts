import { SensorValue } from "../types/sensorValue";
import { Reference } from "../types/reference";
import { SensorEvaluation } from "../types/sensorEvaluation";

export default abstract class BaseSensor {
    name: string;
    values: SensorValue[];

    constructor(name: string) {
        this.name = name;
        this.values = [];
    }

    addValue(measurementDate:Date, value:number){
        this.values.push({measurementDate, value})
    }

    checkInvalidData(reference: number | undefined): SensorEvaluation | undefined {
        if (this.values.length === 0) return "Invalid data: not enough measurements."
        if (!reference) return "Invalid data: missing reference value.";
    }

    abstract evaluateSensor(reference: Reference): SensorEvaluation;
}