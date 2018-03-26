package kenken.game.logic;

import java.util.HashMap;
import java.util.Map;

public class Cage {
	private Map<Integer, Integer> cells;

	private int operator;

	private double target;

	private int filled;

	private int size;

	public Cage(int[] Xs, int[] Ys, int size, char[][] board) {
		cells = new HashMap<Integer, Integer>();

		//magic number of 4, number of operators
		this.operator = (int) (Math.random() * 4);

		for (int i = 0; i < Xs.length; ++i) {
			cells.put(Ys[i] * size + Xs[i], -1);
		}

		target = calculate(Xs, Ys, board);
		this.size = size;
		filled = 0;
	}

	public boolean fill(int i, int j, int no) {
		boolean valid = isValid(i, j, no);
		if (valid) {
			cells.put(j * size + i, no);
			filled += 1;
		}
		return valid;
	}

	public boolean isValid(int i, int j, int no) {
		if (filled < cells.size())
			return true;

		return target == calculate(i, j, no);
	}

	private double calculate(int i, int j, int no) {
		switch(operator) {
		case 0:
			return addition(i, j, no);
		case 1:
			return subtraction(i, j, no);
		case 2:
			return multiplication(i, j, no);
		case 3:
			return division(i, j, no);
		default:
			return 0;
		}
	}

	private double calculate(int[] Xs, int[] Ys, char[][] board) {
		switch(operator) {
		case 0:
			return addition(Xs, Ys, board);
		case 1:
			return subtraction(Xs, Ys, board);
		case 2:
			return multiplication(Xs, Ys, board);
		case 3:
			return division(Xs, Ys, board);
		default:
			return 0;
		}
	}

	private double addition(int i, int j, int no) {
		int sum = 0;

		int temp = cells.get(j * size + i);
		cells.put(j * size + i, no);

		for (Map.Entry<Integer, Integer> entry: cells.entrySet())
			sum += entry.getValue();

		cells.put(j * size + i, temp);

		return sum;
	}

	private double addition(int[] Xs, int[] Ys, char[][] board) {
		int sum = 0;

		for (int i = 0; i < Xs.length; ++i)
			sum += (board[Xs[i]][Ys[i]] - '0');

		return sum;
	}

	private double subtraction(int i, int j, int no) {
		int biggest = 0;
		int sub = 0;

		int temp = cells.get(j * size + i);
		cells.put(j * size + i, no);

		for (Map.Entry<Integer, Integer> entry: cells.entrySet()) {
			biggest = (entry.getValue() > biggest) ?
				entry.getValue() : biggest;

			sub -= entry.getValue();
		}

		sub += biggest * 2;
		cells.put(j * size + i, temp);

		return sub;
	}

	private double subtraction(int[] Xs, int[] Ys, char[][] board) {
		int biggestX = -1;
		int biggestY = -1;
		int biggest = 0;
		for (int i = 0; i < Xs.length; ++i) {
			if ((board[Xs[i]][Ys[i]] - '0') > biggest) {
				biggestX = Xs[i];
				biggestY = Ys[i];
				biggest = (board[Xs[i]][Ys[i]] - '0');
			}
		}

		int sub = 0;
		for (int i = 0; i < Xs.length; ++i) {
			if (biggestX == Xs[i] && biggestY == Ys[i])
				sub += biggest;
			else sub -= (board[Xs[i]][Ys[i]] - '0');
		}

		return sub;
	}

	private double multiplication(int i, int j, int no) {
		int product = 1;

		int temp = cells.get(j * size + i);
		cells.put(j * size + i, no);

		for (Map.Entry<Integer, Integer> entry: cells.entrySet())
			product *= entry.getValue();

		cells.put(j * size + i, temp);

		return product;
	}

	private double multiplication(int[] Xs, int[] Ys, char[][] board) {
		int product = 1;

		for (int i = 0; i < Xs.length; ++i)
			product *= (board[Xs[i]][Ys[i]] - '0');

		return product;
	}

	private double division(int i, int j, int no) {
		int biggest = 0;
		double quot = 1;

		int temp = cells.get(j * size + i);
		cells.put(j * size + i, no);

		for (Map.Entry<Integer, Integer> entry: cells.entrySet()) {
			biggest = (entry.getValue() > biggest) ?
				entry.getValue() : biggest;

			quot /= entry.getValue();
		}

		quot *= biggest * biggest;
		cells.put(j * size + i, temp);

		return quot;
	}

	private double division(int[] Xs, int[] Ys, char[][] board) {
		int biggestX = -1;
		int biggestY = -1;
		int biggest = 0;
		for (int i = 0; i < Xs.length; ++i) {
			if ((board[Xs[i]][Ys[i]] - '0') > biggest) {
				biggestX = Xs[i];
				biggestY = Ys[i];
				biggest = (board[Xs[i]][Ys[i]] - '0');
			}
		}

		double quot = 1;
		for (int i = 0; i < Xs.length; ++i) {
			if (biggestX == Xs[i] && biggestY == Ys[i])
				quot *= biggest;
			else quot /= (board[Xs[i]][Ys[i]] - '0');
		}

		return quot;
	}
}
