package kenken.game.logic;

import java.util.Arrays;

public class KenkenGame {
	static int boardSize;
	static int st;

	static boolean[][] rows;
	static boolean[][] cols;
	static boolean[][] blks;

	private KenkenGame() {
		
	}

	public static void solveSudoku(char[][] board) {
		if (board.length < 1 || board[0].length < 1 || board.length != board[0].length)
			return;

		preProcess(board);

		helper(board, 0, 0);

		postProcess(board);
	}

	private static void preProcess(char[][] board) {
		boardSize = board.length;
		st = (int) Math.sqrt(boardSize);

		rows = new boolean[boardSize][boardSize];
		cols = new boolean[boardSize][boardSize];
		blks = new boolean[boardSize][boardSize];

		for (int i = 0; i < boardSize; ++i) {
			Arrays.fill(rows[i], true);
			Arrays.fill(cols[i], true);
			Arrays.fill(blks[i], true);
		}

		for (int i = 0; i < boardSize; ++i) {
			for (int j = 0; j < boardSize; ++j) {
				if (board[i][j] != '.') {
					rows[i][board[i][j] - '0' - 1] = false;
					cols[j][board[i][j] - '0' - 1] = false;
					blks[i / st * st + j / st][board[i][j] - '0' - 1] = false;
				}
			}
		}
	}

	private static Boolean isValid(char[][] board, int i, int j, int no) {
		return (rows[i][no] && cols[j][no] && blks[i / st * st + j / st][no])?
		true : false;
	}

	private static Boolean helper(char[][] board, int i, int j) {
		//base case, or IAW, last one
		if (i == board.length - 1 && j == board[0].length - 1) {
			//board size can not be larger than '.'
			if (board[i][j] <= '.') {
				for (int k = 1; k <= boardSize; ++k) {
					if (isValid(board, i, j, k - 1)) {
						board[i][j] = (char) k;
						return true;
					}
				}
				return false;
			}
			return true;
		}
		//general case
		if (board[i][j] <= '.') {
			for (int k = 1; k <= boardSize; ++k) {
				if (isValid(board, i, j, k - 1)) {
					rows[i][k - 1] = false;
					cols[j][k - 1] = false;
					blks[i / st * st + j / st][k - 1] = false;

					boolean rest = (j < boardSize - 1)?
						helper(board, i, j + 1):
						helper(board, i + 1, 0);

					rows[i][k - 1] = true;
					cols[j][k - 1] = true;
					blks[i / st * st + j / st][k - 1] = true;

					if (rest) {
						board[i][j] = (char)k; 
						return true;
					}
					else continue;
				}
			}
			return false;
		}
		else {
			return (j < boardSize - 1)?
				helper(board, i, j + 1):
				helper(board, i + 1, 0);
		}
	}

	private static void postProcess(char[][] board) {
		for (int i = 0; i < boardSize; ++i) {
			for (int j = 0; j < boardSize; ++j) {
				if (board[i][j] < '.') {
					board[i][j] += '0';
				}
			}
		}
	}
}
