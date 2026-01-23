import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
	FaSort, 
	FaPlay, 
	FaRedo, 
	FaInfoCircle,
	FaCheckCircle,
	FaArrowLeft,
	FaExchangeAlt,
	FaEye
} from "react-icons/fa";

export default function QuickSort() {
	const [blocks, setBlocks] = useState([]);
	const [speed, setSpeed] = useState(100);
	const [sorting, setSorting] = useState(false);
	const [arraySize, setArraySize] = useState(20);
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const [currentPivot, setCurrentPivot] = useState(-1);
	const [currentRange, setCurrentRange] = useState({ low: -1, high: -1 });

	// Generate initial array on component mount or when arraySize changes
	useEffect(() => {
		generateArray();
	}, [arraySize]);

	// Function to generate a random array
	const generateArray = () => {
		const newArray = [];
		for (let i = 0; i < arraySize; i++) {
			const value = Math.ceil(Math.random() * 100);
			newArray.push({ 
				height: value * 3, 
				state: "none", 
				value,
				index: i
			});
		}
		setBlocks(newArray);
		setComparisons(0);
		setSwaps(0);
		setCurrentPivot(-1);
		setCurrentRange({ low: -1, high: -1 });
		setSorting(false);
	};

	// Function to reset all block states
	const resetStates = (arr) => {
		return arr.map(block => ({ ...block, state: "none" }));
	};

	// Function to swap elements in the array
	const swap = async (arr, i, j) => {
		if (i === j) return;
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
		setSwaps(prev => prev + 1);
		
		// Highlight swapped elements
		arr[i].state = "swapping";
		arr[j].state = "swapping";
		setBlocks([...arr]);
		await new Promise((resolve) => setTimeout(resolve, speed));
		
		// Reset swap highlight
		arr[i].state = "none";
		arr[j].state = "none";
		setBlocks([...arr]);
	};

	// Partition function
	const partition = async (arr, low, high) => {
		// Highlight the pivot
		arr[high].state = "pivot";
		setCurrentPivot(high);
		setBlocks([...arr]);
		await new Promise((resolve) => setTimeout(resolve, speed));

		let pivot = arr[high];
		let i = low - 1;

		// Traverse the array and swap elements smaller than pivot to the left
		for (let j = low; j < high; j++) {
			setComparisons(prev => prev + 1);
			
			// Highlight current element being compared
			arr[j].state = "comparing";
			setBlocks([...arr]);
			await new Promise((resolve) => setTimeout(resolve, speed));

			if (arr[j].value < pivot.value) {
				i++;
				if (i !== j) {
					await swap(arr, i, j);
				}
			}
			
			// Reset comparison highlight
			arr[j].state = "none";
			setBlocks([...arr]);
		}
		
		// Place pivot in correct position
		await swap(arr, i + 1, high);
		arr[i + 1].state = "sorted";
		setBlocks([...arr]);
		
		// Reset pivot highlight
		setCurrentPivot(-1);
		return i + 1;
	};

	// QuickSort function
	const quickSort = async (arr, low, high) => {
		if (low < high) {
			setCurrentRange({ low, high });
			
			let pi = await partition(arr, low, high); // Get partition index

			// Recursively sort elements before and after partition
			await quickSort(arr, low, pi - 1);
			await quickSort(arr, pi + 1, high);
		} else if (low === high) {
			// Mark single element as sorted
			arr[low].state = "sorted";
			setBlocks([...arr]);
			await new Promise((resolve) => setTimeout(resolve, speed));
		}
		
		setCurrentRange({ low: -1, high: -1 });
	};

	// Trigger QuickSort algorithm and set block colors to green after completion
	const handleQuickSort = async () => {
		if (sorting) return;
		
		setSorting(true);
		setComparisons(0);
		setSwaps(0);
		setCurrentPivot(-1);
		setCurrentRange({ low: -1, high: -1 });
		
		// Reset all states
		const resetBlocks = resetStates(blocks);
		setBlocks(resetBlocks);
		await new Promise((resolve) => setTimeout(resolve, speed));
		
		await quickSort([...blocks], 0, blocks.length - 1);
		
		// Mark all as sorted
		setBlocks((prevBlocks) =>
			prevBlocks.map((block) => ({ ...block, state: "sorted" }))
		);
		
		setSorting(false);
		setCurrentPivot(-1);
		setCurrentRange({ low: -1, high: -1 });
	};

	const getBlockColor = (state, index) => {
		if (state === "pivot") {
			return "bg-gradient-to-t from-orange-500 to-orange-400";
		}
		if (state === "comparing") {
			return "bg-gradient-to-t from-yellow-500 to-yellow-400";
		}
		if (state === "swapping") {
			return "bg-gradient-to-t from-red-500 to-red-400";
		}
		if (state === "sorted") {
			return "bg-gradient-to-t from-green-500 to-green-400";
		}
		// Check if in current range
		if (currentRange.low >= 0 && index >= currentRange.low && index <= currentRange.high) {
			return "bg-gradient-to-t from-blue-400 to-blue-300";
		}
		return "bg-gradient-to-t from-purple-500 to-purple-400";
	};

	const getBlockBorder = (state, index) => {
		if (state === "pivot") {
			return "ring-4 ring-orange-300 ring-offset-2";
		}
		if (state === "comparing") {
			return "ring-4 ring-yellow-300 ring-offset-2";
		}
		if (state === "swapping") {
			return "ring-4 ring-red-300 ring-offset-2";
		}
		return "";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Animated Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
			</div>

			{/* Navigation Bar */}
			<nav className="relative bg-white/80 backdrop-blur-md shadow-lg">
				<div className="container mx-auto px-6 py-4 flex items-center justify-between">
					<Link 
						to="/" 
						className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
					>
						<FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
						<span className="font-semibold">Back to Home</span>
					</Link>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
						Quick Sort Visualizer
					</h1>
					<div className="w-24" /> {/* Spacer for centering */}
				</div>
			</nav>

			<div className="relative container mx-auto px-6 py-8">
				{/* Algorithm Info Card */}
				<div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
							<FaInfoCircle className="text-white text-2xl" />
						</div>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">About Quick Sort</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a 'pivot' 
								element and partitioning the array around it, placing smaller elements to the left and larger elements 
								to the right, then recursively sorting the sub-arrays.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div className="bg-purple-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Average Time</div>
									<div className="text-lg font-bold text-purple-600">O(n log n)</div>
								</div>
								<div className="bg-red-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Worst Case</div>
									<div className="text-lg font-bold text-red-600">O(n²)</div>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Space Complexity</div>
									<div className="text-lg font-bold text-green-600">O(log n)</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Visualization Area */}
					<div className="lg:col-span-2">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
								<FaSort className="text-purple-600" />
								Visualization
							</h3>
							<div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 overflow-hidden border-2 border-gray-200">
								{blocks.length === 0 ? (
									<div className="absolute inset-0 flex items-center justify-center">
										<p className="text-gray-400">Generate an array to start</p>
									</div>
								) : (
									<div className="absolute inset-4 flex items-end justify-around gap-1">
										{blocks.map((block, index) => (
											<div
												key={index}
												className="flex flex-col items-center group relative"
												style={{
													width: `${90 / arraySize}%`,
												}}
											>
												{/* Value Label */}
												<div className={`text-xs font-bold mb-2 px-2 py-1 rounded-md transition-all duration-300 ${
													block.state === "pivot" 
														? "bg-orange-100 text-orange-700 scale-110" 
														: block.state === "comparing"
														? "bg-yellow-100 text-yellow-700 scale-110"
														: block.state === "swapping"
														? "bg-red-100 text-red-700 scale-110"
														: block.state === "sorted"
														? "bg-green-100 text-green-700"
														: "bg-gray-100 text-gray-600"
												}`}>
													{block.value}
												</div>
												{/* Index Label */}
												<div className="text-xs text-gray-500 mb-1">
													[{index}]
												</div>
												{/* Block Bar */}
												<div
													className={`w-full transition-all duration-300 ease-in-out rounded-t-lg shadow-md ${getBlockColor(block.state, index)} ${getBlockBorder(block.state, index)}`}
													style={{
														height: `${block.height}px`,
														minHeight: "20px",
													}}
												>
												</div>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Legend */}
							<div className="mt-6 flex flex-wrap gap-4 justify-center">
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-purple-500 to-purple-400 rounded"></div>
									<span className="text-sm text-gray-600">Unsorted</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-blue-400 to-blue-300 rounded"></div>
									<span className="text-sm text-gray-600">Current Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-orange-500 to-orange-400 rounded"></div>
									<span className="text-sm text-gray-600">Pivot</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded"></div>
									<span className="text-sm text-gray-600">Comparing</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
									<span className="text-sm text-gray-600">Swapping</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-green-500 to-green-400 rounded"></div>
									<span className="text-sm text-gray-600">Sorted</span>
								</div>
							</div>
						</div>
					</div>

					{/* Controls Panel */}
					<div className="space-y-6">
						{/* Speed Control */}
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Speed: {speed}ms
							</label>
							<input
								type="range"
								min="1"
								max="500"
								step="10"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								disabled={sorting}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
								style={{
									background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(speed / 5)}%, #e5e7eb ${(speed / 5)}%, #e5e7eb 100%)`
								}}
							/>
							<div className="flex justify-between text-xs text-gray-500 mt-1">
								<span>Fast</span>
								<span>Slow</span>
							</div>
						</div>

						{/* Array Size Control */}
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Array Size: {arraySize}
							</label>
							<input
								type="range"
								min="5"
								max="50"
								step="1"
								value={arraySize}
								onChange={(e) => setArraySize(Number(e.target.value))}
								disabled={sorting}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
								style={{
									background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((arraySize - 5) / 45) * 100}%, #e5e7eb ${((arraySize - 5) / 45) * 100}%, #e5e7eb 100%)`
								}}
							/>
							<div className="flex justify-between text-xs text-gray-500 mt-1">
								<span>5</span>
								<span>50</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							<button
								onClick={handleQuickSort}
								disabled={sorting}
								className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
							>
								<FaPlay /> {sorting ? "Sorting..." : "Start Sorting"}
							</button>
							<button
								onClick={generateArray}
								disabled={sorting}
								className="w-full px-6 py-4 bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
							>
								<FaRedo /> Generate New Array
							</button>
						</div>

						{/* Statistics */}
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<h3 className="text-lg font-bold text-gray-800 mb-4">Statistics</h3>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<span className="text-gray-600 flex items-center gap-2">
										<FaEye className="text-blue-500" />
										Comparisons:
									</span>
									<span className="text-xl font-bold text-blue-600">{comparisons}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600 flex items-center gap-2">
										<FaExchangeAlt className="text-purple-500" />
										Swaps:
									</span>
									<span className="text-xl font-bold text-purple-600">{swaps}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Array Size:</span>
									<span className="text-xl font-bold text-indigo-600">{arraySize}</span>
								</div>
								{currentRange.low >= 0 && (
									<div className="mt-4 pt-3 border-t border-gray-200">
										<div className="text-sm text-gray-600 mb-1">Current Range:</div>
										<div className="text-lg font-bold text-gray-800">
											[{currentRange.low} - {currentRange.high}]
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Status Display */}
						<div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
							sorting
								? "border-yellow-500 bg-yellow-50/50"
								: blocks.length > 0 && blocks.every(b => b.state === "sorted")
								? "border-green-500 bg-green-50/50"
								: "border-gray-200"
						}`}>
							<div className="flex items-center gap-3 mb-2">
								{sorting ? (
									<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
								) : blocks.length > 0 && blocks.every(b => b.state === "sorted") ? (
									<FaCheckCircle className="text-green-600 text-2xl" />
								) : null}
								<h3 className="text-lg font-bold text-gray-800">Status</h3>
							</div>
							<p className={`text-lg font-semibold ${
								sorting
									? "text-yellow-600"
									: blocks.length > 0 && blocks.every(b => b.state === "sorted")
									? "text-green-600"
									: "text-gray-400"
							}`}>
								{sorting 
									? "Sorting in progress..." 
									: blocks.length > 0 && blocks.every(b => b.state === "sorted")
									? "Array Sorted!"
									: "Ready to sort"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
