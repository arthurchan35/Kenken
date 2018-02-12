class Kenken {

	constructor(size) {
		this.board = new Array(size);
		for (var i = 0; i < size; ++i) {
			this.board[i] = new Array(size);
		}

		this.fillNumber(size);
		this.placeCages();
	}

	//given a row and a column that are intercepting each other, return a random number that is in both row and column.
	findARandomCommon(rowSet, columnSet) {
		var result = new Array();

		for (let item of rowSet) {
			if (columnSet.has(item)) {
				result.add(item);
			}
		}

		var randomIndex = Math.floor(Math.random() * result.length);
		return result[randomIndex];
	}

	//every row and every column contain not duplicates. 
	fillNumber(size) {
		var rowSets = new Array(size);
		var columnSets = new Array(size);

		for (var i = 0; i < size; ++i) {
			var rowSet = new Set();
			var columnSet = new Set();
			for (var j = 1; j <= size; ++j) {
				rowSet.add(j);
				columnSet.add(j);
			}
			rowSets[i] = rowSet;
			columnSets[i] = columnSet;
		}

		for (var i = 0; i < size; ++i) {
			for (var j = 0; j < size; ++j) {
				this.board[i][j] = this.findARandomCommon(rowSets[i], columnSets[j]);
				rowSets[i].delete(this.board[i][j]);
				columnSets[j].delete(this.board[i][j]);
			}
		}
	}

	placeCages() {
		
		this.cagesPostWork();
	}

	cagesPostWork() {
		
	}
}