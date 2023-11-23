import * as fs from "node:fs/promises";

export type TempList = {
	nb: number;
	temps: string[];
};

//const buffer = await fs.readFile('input.txt');
export const buffer = await fs.readFile("input.txt");

// Tableau avec l'ensemble des lignes du fichier
export const content = buffer.toString();
const tabContent: string[] = content.split("\n");

let inputs: TempList[] = [];

let index: number = 0;
for (const line in tabContent) {
	if (parseInt(line) % 2 == 0) {
		const input: TempList = { nb: parseInt(tabContent[line]), temps: [] };
		inputs = [...inputs, input];
	} else {
		inputs[index].temps = tabContent[line].split(" ");
		index++;
	}
}

console.log(inputs);

const n1 = inputs[0].nb;
const inputs1: string[] = inputs[0].temps;

const n2: number = inputs[1].nb;
const inputs2: string[] = inputs[1].temps;

// si t négatif

describe("Temperatures", () => {
	it("should return 5", () => {
		const n = parseInt(content.split("\n")[0]);
		expect(n).toBe(5);
	});

	it("should return temperatures tab number", () => {
		const result: number[] = content
			.split("\n")[1]
			.split(" ")
			.map((elt) => parseInt(elt));

		expect(result).toEqual([1, -2, -8, 4, 5]);
	});

	it("should return 1 for first temperature sequence", () => {
		let closestTemp = findClosestTempToZero(n1, inputs1, 5526);
		expect(closestTemp).toBe(1);
	});

	it("should return -5 for second temperature sequence", () => {
		let closestTemp = findClosestTempToZero(n2, inputs2, 5526);
		expect(closestTemp).toBe(-5);
	});

	it("should return 5 for third temperature sequence", () => {
		let closestTemp = findClosestTempToZero(inputs[2].nb, inputs[2].temps, 5526);
		expect(closestTemp).toBe(5);
	});

	it("should return 5 for fourth temperature sequence", () => {
		let closestTemp = findClosestTempToZero(inputs[3].nb, inputs[3].temps, 5526);
		expect(closestTemp).toBe(5);
	});

	it("should return 0 if temperature sequence is empty ", () => {
		let closestTemp = findClosestTempToZero(inputs[4].nb, inputs[4].temps, 5526);
		expect(closestTemp).toBe(0);
	});

	it("should return -273 for single temperature in the sequence", () => {
		let closestTemp = findClosestTempToZero(inputs[5].nb, inputs[5].temps, 5526);
		expect(closestTemp).toBe(-273);
	});
	it("should return 5526 for single temperature in the sequence", () => {
		let closestTemp = findClosestTempToZero(inputs[6].nb, inputs[6].temps, 5526);
		expect(closestTemp).toBe(5526);
	});
	it("should return -10 for two negatives temperature in the sequence", () => {
		let closestTemp = findClosestTempToZero(inputs[7].nb, inputs[7].temps, 5526);
		expect(closestTemp).toBe(-10);
	});
});

const findClosestTempToZero = (n: number, inputs: string[], maxVal: number): number => {
	if (inputs.length == 0) {
		return 0;
	}
	if (inputs.length == 1) {
		if (/[0-9]/i.test(inputs[0])) {
			return parseInt(inputs[0]);
		} else {
			return 0;
		}
	}
	let closestTemp = maxVal;
	for (let i = 0; i < n; i++) {
		const t: number = parseInt(inputs[i]);
		if (Math.abs(t) <= Math.abs(closestTemp)) {
			if (Math.abs(t) == Math.abs(closestTemp) && t < 0) {
				continue;
			}
			closestTemp = t;
		}
	}
	return closestTemp;
};
