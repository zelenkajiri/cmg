import { abs, std, mean } from "mathjs";
import { Reference } from "../../types/reference";
import { SensorEvaluation } from "../../types/sensorEvaluation";
import BaseSensor from "../baseSensor";

const ultraPreciseMean = 0.5;
const ultraPreciseDev = 3;

const veryPreciseMean = 0.5;
const veryPreciseDev = 5;

export default class Thermometer extends BaseSensor {
    get standardDeviation() {
        return std(this.values.map(item => item.value));
    }
    get mean() {
        return mean(this.values.map(item => item.value));
    }

    difMean(reference: number) {
        return abs(reference - this.mean);
    }

    isUltraPrecise(reference: number) {
        return this.difMean(reference) <= ultraPreciseMean && this.standardDeviation <= ultraPreciseDev;
    }

    isVeryPrecise(reference: number) {
        return this.difMean(reference) <= veryPreciseMean && this.standardDeviation <= veryPreciseDev;
    }

    evaluateSensor({ thermometer }: Reference): SensorEvaluation {
        const invalid = this.checkInvalidData(thermometer);
        if (invalid) return invalid;

        if (this.isUltraPrecise(thermometer!))
            return "ultra precise";
        if (this.isVeryPrecise(thermometer!))
            return "very precise";
        return "precise";
    }
}