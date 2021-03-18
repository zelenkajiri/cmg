import { parseData } from "./data/parseData"

/**
 * Evaluates sensors.
 * @param logContentsString string with measurements
 * @returns evaluation string of sensors
 */
export const evaluateLogFile = (logContentsString: string) : string => {
    return JSON.stringify(parseData(logContentsString));
}