enum direction {
	UP = "U",
	UP_RIGHT = "UR",
	RIGHT = "R",
	DOWN_RIGHT = "DR",
	DOWN = "D",
	DOWN_LEFT = "DL",
	LEFT = "L",
	UP_LEFT = "UL",
}

class IndexBS {
	startH: number;
	endH: number;
	midH: number;
	startW: number;
	endW: number;
	midW: number;

	constructor(building: Building) {
		this.startH = 0;
		this.endH = building.height - 1;
		this.midH = Math.floor((this.startH + this.endH) / 2);
		this.startW = 0;
		this.endW = building.width - 1;
		this.midW = Math.floor((this.startW + this.endW) / 2);
	}

	_updateMid() {
		this.midW = Math.floor((this.startW + this.endW) / 2);
		this.midH = Math.floor((this.startH + this.endH) / 2);
	}
}

class Building {
	width: number;
	height: number;
	tab: number[][] = [];

	constructor(sizeX: number, sizeY: number) {
		this.width = sizeX;
		this.height = sizeY;
		for (let i = 0; i < this.height; i++) {
			this.tab[i] = [];
			for (let j = 0; j < this.width; j++) {
				this.tab[i][j] = 0;
			}
		}
	}
}

class Batman {
	// Position
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

describe("Shadows of knight", () => {
	it("should return a 3 7 in the first test", () => {
		// Arrange
		const building: Building = new Building(4, 8);
		const batman: Batman = new Batman(2, 3);
		building.tab[batman.y][batman.x] = 1;
		building.tab[7][3] = 2;
		console.table(building.tab);

		let maxTurns = 40;
		const bombDirSeq: string[] = "DR D D D".split(" ");

		let result: string = "";
		const binarySearch = new IndexBS(building);
		binarySearch.startH = 3;
		binarySearch.startW = 2;

		// Act
		let i = 0;
		while (maxTurns > 0 && i < bombDirSeq.length) {
			if (i == 0) {
				result = initBatmanPosOnMiddle(batman, binarySearch);
			} else {
				result = batmanJump(bombDirSeq[i], batman, binarySearch);
			}
			if (result == "3 7") break;
			maxTurns--;
			i++;
		}
		// Assert
		expect(result).toBe("3 7");
	});

	it("should return a 24 2 for less jumps test", () => {
		// Arrange
		const building: Building = new Building(25, 33);
		const batman: Batman = new Batman(2, 29);
		building.tab[batman.y][batman.x] = 1;
		console.table(building.tab);

		let maxTurns = 49;
		const bombDirSeq: string[] = "UR UR UR UR UR UR UR UR UR UR UR UR UR".split(" ");

		let result: string = "";
		const binarySearch = new IndexBS(building);
		console.log(binarySearch);

		let i = 0;
		while (maxTurns > 47 && i < bombDirSeq.length) {
			if (i == 0) {
				result = initBatmanPosOnMiddle(batman, binarySearch);
			} else {
				result = batmanJump(bombDirSeq[i], batman, binarySearch);
			}
			console.log(binarySearch);
			if (result == "24 2") break;
			maxTurns--;
			i++;
		}

		expect(result).toBe("24 2");
	});

	xit("should return a 3 6 when bombDir equal D", () => {
		const building: Building = new Building(4, 8);
		const batman: Batman = new Batman(2, 3);
		building.tab[batman.y][batman.x] = 1;
		building.tab[7][3] = 2;
		let maxTurns = 40;
		console.table(building.tab);
		let binarySearch = new IndexBS(building);
		let result: string = "";
		while (maxTurns > 0) {
			let bombDir: string = "DR";
			result = batmanJump(bombDir, batman, binarySearch);
			maxTurns--;
		}
		expect(result).toBe("3 6");
	});

	xit("should return a 3 5 when bombDir equal UR", () => {
		const building: Building = new Building(4, 8);
		const batman: Batman = new Batman(2, 3);
		building.tab[batman.y][batman.x] = 1;
		building.tab[7][3] = 2;
		let maxTurns = 40;
		console.table(building.tab);
		let binarySearch = new IndexBS(building);
		let result: string = "";
		let bombDir: string = "UR";
		while (maxTurns > 0) {
			let bombDir: string = "DR";
			result = batmanJump(bombDir, batman, binarySearch);
			maxTurns--;
		}
		expect(result).toBe("3 5");
	});

	xit("should return a 3 4 when bombDir equal U", () => {
		const building: Building = new Building(4, 8);
		const batman: Batman = new Batman(2, 3);
		building.tab[batman.y][batman.x] = 1;
		building.tab[7][3] = 2;
		let maxTurns = 40;
		console.table(building.tab);
		let binarySearch = new IndexBS(building);
		let result: string = "";
		let bombDir: string = "U";
		while (maxTurns > 0) {
			let bombDir: string = "DR";
			result = batmanJump(bombDir, batman, binarySearch);
			maxTurns--;
		}
		expect(result).toBe("3 4");
	});

	xit("should return a 1 40 when bombDir equal D and max turns == 6", () => {
		const building: Building = new Building(4, 8);
		const batman: Batman = new Batman(2, 3);
		building.tab[batman.y][batman.x] = 1;
		building.tab[7][3] = 2;
		let maxTurns = 40;
		console.table(building.tab);
		let binarySearch = new IndexBS(building);
		let result: string = "";
		// Arrange
		const tab: number[] = [];
		for (let i = 0; i < building.tab.length; i++) {
			tab[i] = i;
		}
		console.table(tab);
		building.tab[39][0] = 2;
		while (maxTurns > 0) {
			let bombDir: string = "DR";
			result = batmanJump(bombDir, batman, binarySearch);
			maxTurns--;
		}
		expect(result).toBe("1 40");
	});
});

// SI DOWN OR UP == 1D
// ELSE == 2D

function batmanJump(bombDir: string, batman: Batman, indexForBs: IndexBS): string {
	switch (bombDir) {
		case direction.DOWN:
			indexForBs.startH = indexForBs.midH + 1;
			break;
		case direction.UP:
			indexForBs.endH = indexForBs.midH - 1;
			break;
		case direction.DOWN_RIGHT:
			indexForBs.startH = indexForBs.midH + 1;
			indexForBs.startW = indexForBs.midW + 1;
			break;
		case direction.UP_RIGHT:
			indexForBs.endH = indexForBs.midH - 1;
			indexForBs.startW = indexForBs.midW + 1;
			break;
		case direction.LEFT:
			indexForBs.endW = indexForBs.midW - 1;
			break;
		case direction.RIGHT:
			indexForBs.startW = indexForBs.midW + 1;
			break;
		case direction.UP_LEFT:
			indexForBs.endH = indexForBs.midH - 1;
			indexForBs.endW = indexForBs.midW - 1;
			break;
		case direction.DOWN_LEFT:
			indexForBs.startH = indexForBs.midH + 1;
			indexForBs.endW = indexForBs.midW - 1;
			break;
		default:
			break;
	}
	indexForBs._updateMid();
	console.log("midH : " + indexForBs.midH, "midW : " + indexForBs.midW);
	batman.x = indexForBs.midW;
	batman.y = indexForBs.midH;
	return `${batman.x} ${batman.y}`;
}

function initBatmanPosOnMiddle(batman: Batman, indexForBs: IndexBS): string {
	batman.x = indexForBs.midW;
	batman.y = indexForBs.midH;
	return `${batman.x} ${batman.y}`;
}
