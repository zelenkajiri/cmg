import BaseSensor from "../sensors/baseSensor";
import CODetector from "../sensors/CODetector";
import Hygrometer from "../sensors/hygrometer";
import Thermometer from "../sensors/thermometer";
import { Output } from "../types/output";
import { Reference } from "../types/reference";

const TYPE_REFERENCE = "reference";
const TYPE_THERMOMETER = "thermometer";
const TYPE_HYGROMETER = "humidity";
const TYPE_CODETECTOR = "monoxide";

export const parseData = (logContentsStr: string) => {
    let output: Output = {};
    let reference: Reference = {};
    let sensor: BaseSensor | undefined;

    const lines = logContentsStr.split("\r\n");
    
    lines.forEach(line => {
        const lineSplit = line.split(" ");
        let date = new Date(lineSplit[0]);
        
        if (!isNaN(date.getTime())) // we check firstly the most common record
        {
            if (!sensor) throw new Error("Parsing error: sensor");
            sensor.addValue(new Date(lineSplit[0]), parseFloat(lineSplit[1]));
        }
        else if (lineSplit[0] === TYPE_REFERENCE)
        {
            reference = createReferences(lineSplit);
        }
        else if (lineSplit[0] === TYPE_THERMOMETER)
        {
            addPreviousSensor(output, sensor, reference); // before creation of new sensor, we try to save the one we worked previously
            sensor = new Thermometer(lineSplit[1]);
        }
        else if (lineSplit[0] === TYPE_HYGROMETER)
        {
            addPreviousSensor(output, sensor, reference);
            sensor = new Hygrometer(lineSplit[1]);
        }
        else if (lineSplit[0] === TYPE_CODETECTOR)
        {
            addPreviousSensor(output, sensor, reference);
            sensor = new CODetector(lineSplit[1]);
        }
    });

    addPreviousSensor(output, sensor, reference); // after parsing file we save the last sensor on log file

    return output;
}

const addPreviousSensor = (output: Output, sensor: BaseSensor | undefined, reference: Reference) => {
    if (sensor)
        output[sensor.name] = sensor.evaluateSensor(reference);
}

const createReferences = (lineSplit: string[]) : Reference => {
    if (lineSplit.length !== 4) throw new Error("Parsing error: references");
    return {
        thermometer: parseFloat(lineSplit[1]), 
        hygrometer: parseFloat(lineSplit[2]), 
        CO: parseFloat(lineSplit[3])
    };
}
