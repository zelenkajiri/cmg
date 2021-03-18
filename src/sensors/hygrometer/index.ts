import { abs } from "mathjs";
import { Reference } from "../../types/reference";
import { SensorEvaluation } from "../../types/sensorEvaluation";
import BaseSensor from "../baseSensor";

const keep = 1;

export default class Hygrometer extends BaseSensor {
    shouldBeKept(reference: number) {
        return this.values.every(item => abs(item.value - reference) <= keep)
    }

    evaluateSensor({ hygrometer }: Reference): SensorEvaluation {
        const invalid = this.checkInvalidData(hygrometer);
        if (invalid) return invalid;

        if(this.shouldBeKept(hygrometer!))
            return "keep";
        return "discard";
    }
}