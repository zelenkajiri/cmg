import { abs } from "mathjs";
import { Reference } from "../../types/reference";
import { SensorEvaluation } from "../../types/sensorEvaluation";
import BaseSensor from "../baseSensor";

const keep = 3;

export default class CODetector extends BaseSensor {
    shouldBeKept(reference: number) {
        return this.values.every(item => abs(item.value - reference) <= keep)
    }

    evaluateSensor({ CO }: Reference): SensorEvaluation {
        const invalid = this.checkInvalidData(CO);
        if (invalid) return invalid;

        if(this.shouldBeKept(CO!))
            return "keep";
        return "discard";
    }
}