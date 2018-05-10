package kenken.game.logic;

public class KenkenGame {
	static char[][] board;

	static Cage[][] cages;

	static boolean[][] rows;
	static boolean[][] cols;

	private KenkenGame() {}

	public static char[][] generateBoard(int boardLength) {

		board = new char[boardLength][boardLength];

		preProcess();

		fillBoard(0, 0);

		postProcess();
	}

	public static void buildCages(int boardLength) {
		char[][] temp = new char[boardLength][boardLength];

		char counter = '0';

		for (int i = 0; i < boardLength; ++i) {
			for (int j = 0; j < boardLength; ++j) {
				if (temp[i][j] == '\0') {
					fillCage(temp, counter, i, j, 1000);
					counter += 1;
				}
			}
		}
	}

	private static int fillCage(char[][] temp, char counter, int i, int j, int decay) {
		if (i < 0 || i >= temp.length || j < 0 || j >= temp.length) {
			return 0;
		}
		if (temp[i][j] != '\0') {
			return 0;
		}

		if (decay <= 0) {
			return 0;
		}

		temp[i][j] = counter;

		int shuffled[] = FYShuffle(4);

		int decayed = (int)(Math.random() * (1000 - 1000 / temp.length) + 1000 / temp.length);

		for (int k = 0; k < 4; ++k) {

			if (decay < decayed) {
				break;
			}

			switch (shuffled[k]) {
			case 0://left cell
				decayed += fillCage(temp, counter, i - 1, j, decay - decayed);
				break;
			case 1://bottom cell
				decayed += fillCage(temp, counter, i, j + 1, decay - decayed);
				break;
			case 2://right cell
				decayed += fillCage(temp, counter, i + 1, j, decay - decayed);
				break;
			case 3://top cell
				decayed += fillCage(temp, counter, i, j - 1, decay - decayed);
				break;
			default:
				break;
			}

		}

		return decayed;

	}

	public static boolean isValid(int i, int j, int no) {
		return (rows[i][no] && cols[j][no])?
		true : false;
	}

	private static void preProcess() {

		rows = new boolean[board.length][board.length];
		cols = new boolean[board.length][board.length];

		for (int i = 0; i < board.length; ++i) {
			for (int j = 0; j < board.length; ++j) {
				if (board[i][j] == '.') {
					rows[i][board[i][j] - '0' - 1] = true;
					cols[j][board[i][j] - '0' - 1] = true;
				}
			}
		}
	}

	private static int[] FYShuffle(int length) {
		int[] shuffled = new int[length];
		for (int i = 0; i < length; ++i)
			shuffled[i] = i + 1;

		for (int i = 0; i < length; ++i) {
			int ranIndex = (int) (Math.random() * (length - i));
			int temp = shuffled[ranIndex];
			shuffled[ranIndex] = shuffled[length - 1 - i];
			shuffled[length - 1 - i] = temp;
		}

		return shuffled;
	}

	private static Boolean fillBoard(int i, int j) {

		int shuffled[] = FYShuffle(board.length);

		//base case, or IAW, last one
		if (i == board.length - 1 && j == board[0].length - 1) {
			//board size can not be larger than '.'
			if (board[i][j] <= '.') {
				for (int k = 1; k <= board.length; ++k) {
					if (isValid(i, j, shuffled[k - 1] - 1)) {
						board[i][j] = (char)shuffled[k - 1];
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
				if (isValid(i, j, shuffled[k - 1] - 1)) {
					rows[i][shuffled[k - 1] - 1] = false;
					cols[j][shuffled[k - 1] - 1] = false;

					boolean rest = (j < board.length - 1)?
						fillBoard(i, j + 1):
						fillBoard(i + 1, 0);

					rows[i][shuffled[k - 1] - 1] = true;
					cols[j][shuffled[k - 1] - 1] = true;

					if (rest) {
						board[i][j] = (char)shuffled[k - 1];
						return true;
					}
					else continue;
				}
			}
			return false;
		}
		else {
			return (j < board.length - 1)?
				fillBoard(i, j + 1):
				fillBoard(i + 1, 0);
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
