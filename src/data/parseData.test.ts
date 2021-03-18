import { parseData } from "./parseData";
import { getDataFromFile } from "./getDataFromFile";

test("correctly parses data", () => {
    expect(parseData(getDataFromFile())).toMatchObject({"temp-1":"precise","temp-2":"ultra precise","hum-1":"keep","hum-2":"discard","mon-1":"keep","mon-2":"discard"});
})

