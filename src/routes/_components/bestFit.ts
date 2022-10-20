/**
 * result of the best fit calculation
 */
export interface BestFitResult {
	/**
	 * number of total rows
	 */
	rows: number;
	/**
	 * number of columns, or in other words, tiles per row
	 */
	cols: number;
	/**
	 * height of the tile
	 */
	height: number;
	/**
	 * width of the tile
	 */
	width: number;
}

export interface BestFitInput {
	containerWidth: number;
	containerHeight: number;
	numTiles: number;
	/**
	 * aspect ratio of the tile
	 */
	aspectRatio?: number;
}

/**
 * given a container of some dimensions, and n number of tiles with some aspect ratio, find the best
 * way to fit the tiles in the container for maximum utilisation of space.
 * https://github.com/fzembow/rect-scaler/blob/master/src/index.ts
 */
export function findBestFitLayout({
	containerHeight,
	containerWidth,
	numTiles: n,
	aspectRatio
}: BestFitInput): BestFitResult {
	let result = { rows: 0, cols: 0, height: 0, width: 0 };
	if (n <= 0 || containerWidth <= 0 || containerHeight <= 0) {
		return result;
	}
	aspectRatio ||= 1; // if not passed assume square
	let bestArea = 0; // area = tileWidth * tileHeight

	// brute force from 1 column(and n rows) to n columns(and 1 row)
	for (let cols = 1; cols <= n; cols++) {
		const rows = Math.ceil(n / cols);
		// now that we have number of rows and columns, there are two ways to stack the tiles,
		// - to use the full width(dividing the width evenly between cols)
		// - to use the full height(dividing the height evenly between rows)
		// we'll try with first, and if it's not possible we'll go with second

		// tile width and height if we use the full container width
		let width = Math.floor(containerWidth / cols);
		let height = Math.floor(width / aspectRatio);

		// max height possible is when the total height is divided equally between the rows
		const maxHeightPossible = Math.floor(containerHeight / rows);
		if (height > maxHeightPossible) {
			// using full width is not possible for given number of columns, use full height instead
			height = maxHeightPossible;
			width = Math.floor(maxHeightPossible * aspectRatio);
		}
		const tileArea = width * height;
		if (tileArea > bestArea) {
			bestArea = tileArea;
			result = { rows, cols, height, width };
		}
	}

	return result;
}
