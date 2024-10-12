import { ArrowUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function QuickSort() {
	const [blocks, setBlocks] = useState([]);
	const [speed, setSpeed] = useState(100);
	const [sorting, setSorting] = useState(false);
	const [arraySize, setArraySize] = useState(20);

	// Generate initial array on component mount or when arraySize changes
	useEffect(() => {
		generateArray();
	}, [arraySize]);

	// Function to generate a random array
	const generateArray = () => {
		const newArray = [];
		for (let i = 0; i < arraySize; i++) {
			const value = Math.ceil(Math.random() * 100);
			newArray.push({ height: value * 3, state: "none", value });
		}
		setBlocks(newArray);
	};

	// Function to swap elements in the array
	const swap = async (arr, i, j) => {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		setBlocks([...arr]);
		await new Promise((resolve) => setTimeout(resolve, speed));
	};

	// Partition function
	const partition = async (arr, low, high) => {
		let pivot = arr[high]; // Pivot element is the rightmost element
		let i = low - 1;

		// Traverse the array and swap elements smaller than pivot to the left
		for (let j = low; j < high; j++) {
			arr[j].state = "yellow"; // Marking comparison in yellow
			setBlocks([...arr]);
			await new Promise((resolve) => setTimeout(resolve, speed));

			if (arr[j].height < pivot.height) {
				i++;
				await swap(arr, i, j);
			}
			arr[j].state = "none"; // Resetting the state after comparison
		}
		await swap(arr, i + 1, high);
		return i + 1;
	};

	// QuickSort function
	const quickSort = async (arr, low, high) => {
		if (low < high) {
			let pi = await partition(arr, low, high); // Get partition index

			// Recursively sort elements before and after partition
			await quickSort(arr, low, pi - 1);
			await quickSort(arr, pi + 1, high);
		}
	};

	// Trigger QuickSort algorithm and set block colors to green after completion
	const handleQuickSort = async () => {
		setSorting(true);
		await quickSort(blocks, 0, blocks.length - 1);
		setBlocks((prevBlocks) =>
			prevBlocks.map((block) => ({ ...block, state: "green" }))
		);
		setSorting(false);
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
					<h1 className="text-3xl font-bold text-white">
						Quick Sort Visualizer
					</h1>
				</div>
				<div className="p-6 flex flex-col lg:flex-row">
					<div className="w-full lg:w-2/3 mb-6 lg:mb-0 lg:pr-6">
						<div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
							<div className="absolute inset-0 flex items-end justify-around">
								{blocks.map((block, index) => (
									<div
										key={index}
										className="flex flex-col items-center"
										style={{
											width: `${90 / arraySize}%`,
										}}
									>
										<div className="text-xs text-gray-600 mb-1">
											{block.value}
										</div>
										<div
											className={`w-full transition-all duration-300 ease-in-out rounded-t-md ${
												block.state === "yellow"
													? "bg-yellow-400"
													: block.state === "red"
													? "bg-red-500"
													: block.state === "green"
													? "bg-green-500"
													: "bg-purple-500"
											}`}
											style={{ height: `${block.height}px` }}
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
								max="1000"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								disabled={sorting}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="mb-6 flex items-center">
							<label className="text-sm font-medium text-gray-700 mr-4 w-32">
								Array Size: {arraySize}
							</label>
							<input
								type="range"
								min="5"
								max="100"
								value={arraySize}
								onChange={(e) => setArraySize(Number(e.target.value))}
								disabled={sorting}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="flex flex-col space-y-4">
							<button
								onClick={generateArray}
								disabled={sorting}
								className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 disabled:opacity-50"
							>
								Generate New Array
							</button>
							<button
								onClick={handleQuickSort}
								disabled={sorting}
								className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
							>
								Sort
							</button>
						</div>
						<div className="mt-6 p-4 bg-gray-100 rounded-md">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700">
									Sorting Status:
								</span>
								<span
									className={`text-lg font-bold ${
										sorting ? "text-yellow-600" : "text-green-600"
									}`}
								>
									{sorting ? "In Progress" : "Ready"}
								</span>
							</div>
							<div className="mt-2 flex items-center">
								<ArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
								<span className="text-sm text-gray-600">
									Comparing and swapping elements
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
