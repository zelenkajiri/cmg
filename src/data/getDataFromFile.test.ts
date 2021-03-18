import { getDataFromFile } from "./getDataFromFile"

test("reads data from file", () => {
    expect(getDataFromFile()).toMatch(new RegExp("^reference+"));
})