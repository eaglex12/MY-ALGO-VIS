"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";

export default function InsertionSort() {
	const [bars, setBars] = useState([]);
	const [speed, setSpeed] = useState(100);
	const [numElements, setNumElements] = useState(20);
	const [sorting, setSorting] = useState(false);
	const [movedBackIndex, setMovedBackIndex] = useState(null);
	const [currentKeyHeight, setCurrentKeyHeight] = useState(0);

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const newBars = [];
		for (let i = 0; i < numElements; i++) {
			const value = Math.ceil(Math.random() * 100);
			newBars.push({ height: value * 3, id: i, state: "unsorted", value });
		}
		setBars(newBars);
	};

	const insertionSort = async () => {
		setSorting(true);
		let newBars = [...bars];

		const sortedPassArray = [];

		for (let i = 1; i < newBars.length; i++) {
			let key = newBars[i];
			let j = i - 1;

			setCurrentKeyHeight(key.height);

			// Highlight the current key
			newBars[i].state = "active";
			setBars([...newBars]);
			await new Promise((resolve) => setTimeout(resolve, speed));

			// Shifting elements to the right until the correct position is found
			while (j >= 0 && newBars[j].height > key.height) {
				newBars[j + 1] = { ...newBars[j] }; // Shift element to the right
				newBars[j].state = "unsorted"; // Reset state for the comparison element
				setMovedBackIndex(j + 1); // Track the moved element
				setBars([newBars]); // Trigger re-render with updated array

				await new Promise((resolve) => setTimeout(resolve, speed));
				j--;
			}

			// Place the key in its correct position
			newBars[j + 1] = { ...key, state: "unsorted" }; // Set key back to unsorted state after placement
			setBars([newBars]);

			await new Promise((resolve) => setTimeout(resolve, speed));

			// Mark the sorted portion of the array after each iteration
			for (let k = 0; k <= i; k++) {
				newBars[k] = { ...newBars[k], state: "sorted" };
			}
			setBars([newBars]);
		}

		// Ensure all bars are marked as sorted at the end
		newBars = newBars.map((bar) => ({ ...bar, state: "sorted" }));
		setBars(newBars);

		// Reset the control state after sorting completes
		setMovedBackIndex(null);
		setCurrentKeyHeight(0);
		setSorting(false);
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
					<h1 className="text-3xl font-bold text-white">
						Insertion Sort Visualizer
					</h1>
				</div>
				<div className="p-6 flex flex-col lg:flex-row">
					<div className="w-full lg:w-2/3 mb-6 lg:mb-0 lg:pr-6">
						<div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
							<div className="absolute inset-0 flex items-end justify-around">
								{bars.map((bar, index) => (
									<div
										key={bar.id}
										className="flex flex-col items-center"
										style={{
											width: `${90 / numElements}%`,
										}}
									>
										<div className="text-xs text-gray-600 mb-1">
											{bar.height / 3}
										</div>
										<div
											className={`w-full transition-all duration-300 ease-in-out rounded-t-md bg-opacity-100 transition-colors ${
												bar.state === "active"
													? "bg-yellow-400"
													: bar.state === "sorted"
													? "bg-green-500"
													: "bg-teal-500"
											} ${index === movedBackIndex ? "animate-bounce" : ""}`}
											style={{ height: `${bar.height}px` }}
										></div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/3">
						<div className="mb-6 flex items-center">
							<label className="text-sm font-medium text-gray-700 mr-4 w-32">
								Speed: {speed} ms
							</label>
							<input
								type="range"
								min="1"
								max="500"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								disabled={sorting}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="mb-6 flex items-center">
							<label className="text-sm font-medium text-gray-700 mr-4 w-32">
								Array Size: {numElements}
							</label>
							<input
								type="range"
								min="5"
								max="100"
								value={numElements}
								onChange={(e) => setNumElements(Number(e.target.value))}
								disabled={sorting}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="flex flex-col space-y-4">
							<button
								onClick={generateArray}
								disabled={sorting}
								className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300 disabled:opacity-50"
							>
								Generate New Array
							</button>
							<button
								onClick={insertionSort}
								disabled={sorting}
								className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-50"
							>
								Sort
							</button>
						</div>
						{currentKeyHeight > 0 && (
							<div className="mt-6 p-4 bg-gray-100 rounded-md">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-gray-700">
										Current Key:
									</span>
									<span className="text-lg font-bold text-green-600">
										{currentKeyHeight / 3}
									</span>
								</div>
								<div className="mt-2 flex items-center">
									<ArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
									<span className="text-sm text-gray-600">
										Comparing and inserting
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
