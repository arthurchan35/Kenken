package kenken.game.logic;

import java.util.Arrays;

public class KenkenGame {
	static char[][] board;
	static int st;

	static boolean[][] rows;
	static boolean[][] cols;
	static boolean[][] blks;

	private KenkenGame() {
		
	}

	public static void solveSudoku(char[][] board) {
		if (board.length < 1 || board[0].length < 1 || board.length != board[0].length)
			return;

		preProcess();

		helper(0, 0);

		postProcess();
	}

	public static boolean isValid(int i, int j, int no) {
		return (rows[i][no] && cols[j][no] && blks[i / st * st + j / st][no])?
		true : false;
	}

	private static void preProcess() {
		st = (int) Math.sqrt(board.length);

		rows = new boolean[board.length][board.length];
		cols = new boolean[board.length][board.length];
		blks = new boolean[board.length][board.length];

		for (int i = 0; i < board.length; ++i) {
			Arrays.fill(rows[i], true);
			Arrays.fill(cols[i], true);
			Arrays.fill(blks[i], true);
		}

		for (int i = 0; i < board.length; ++i) {
			for (int j = 0; j < board.length; ++j) {
				if (board[i][j] != '.') {
					rows[i][board[i][j] - '0' - 1] = false;
					cols[j][board[i][j] - '0' - 1] = false;
					blks[i / st * st + j / st][board[i][j] - '0' - 1] = false;
				}
			}
		}
	}

	private static Boolean helper(int i, int j) {
		//base case, or IAW, last one
		if (i == board.length - 1 && j == board[0].length - 1) {
			//board size can not be larger than '.'
			if (board[i][j] <= '.') {
				for (int k = 1; k <= board.length; ++k) {
					if (isValid(i, j, k - 1)) {
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
			for (int k = 1; k <= board.length; ++k) {
				if (isValid(i, j, k - 1)) {
					rows[i][k - 1] = false;
					cols[j][k - 1] = false;
					blks[i / st * st + j / st][k - 1] = false;

					boolean rest = (j < board.length - 1)?
						helper(i, j + 1):
						helper(i + 1, 0);

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
			return (j < board.length - 1)?
				helper(i, j + 1):
				helper(i + 1, 0);
		}
	}

	private static void postProcess() {
		for (int i = 0; i < board.length; ++i) {
			for (int j = 0; j < board.length; ++j) {
				if (board[i][j] < '.') {
					board[i][j] += '0';
				}
			}
		}
	}
}
