import { getDataFromFile } from "./data/getDataFromFile";
import { evaluateLogFile } from "./evaluateLogFile";

const evaluate = () => {
    const data = getDataFromFile();

    const output = evaluateLogFile(data);

    console.log(output);
}

export default evaluate;