import { readFileSync } from 'fs';

const FILE_LOCATION = "./src/data/data.txt";

export const getDataFromFile = () => readFileSync(FILE_LOCATION, "utf-8");