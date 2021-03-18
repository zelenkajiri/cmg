import { parseData } from "./data/parseData"

export const evaluateLogFile = (logContentsString: string) : string => {
    return JSON.stringify(parseData(logContentsString));
}