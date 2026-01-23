import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
	FaSearch, 
	FaPlay, 
	FaRedo, 
	FaInfoCircle,
	FaCheckCircle,
	FaTimesCircle,
	FaArrowLeft,
	FaArrowRight,
	FaArrowDown
} from "react-icons/fa";

const BinarySearch = () => {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [speed, setSpeed] = useState(300);
	const [numElements, setNumElements] = useState(20);
	const [blocks, setBlocks] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [currentMid, setCurrentMid] = useState(-1);
	const [currentStart, setCurrentStart] = useState(-1);
	const [currentEnd, setCurrentEnd] = useState(-1);
	const [comparisons, setComparisons] = useState(0);
	const [foundIndex, setFoundIndex] = useState(-1);
	const [searchDirection, setSearchDirection] = useState(""); // "left" or "right"

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const arr = [];
		for (let i = 0; i < numElements; i++) {
			const val = Math.ceil(Math.random() * 100);
			arr.push(val);
		}
		arr.sort((a, b) => a - b);

		const newBlocks = arr.map((value, index) => ({
			value,
			index,
			status: "default", // default, mid, left-range, right-range, found, eliminated
		}));
		setBlocks(newBlocks);
		setOutput("");
		setCurrentMid(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setComparisons(0);
		setFoundIndex(-1);
		setIsSearching(false);
		setSearchDirection("");
	};

	const resetColors = () => {
		const resetBlocks = blocks.map(block => ({
			...block,
			status: "default"
		}));
		setBlocks(resetBlocks);
	};

	const binarySearch = async () => {
		// Validation
		if (!num || num.trim() === "") {
			setOutput("Please enter a number to search");
			return;
		}

		if (isSearching) {
			return; // Prevent multiple simultaneous searches
		}

		const target = parseInt(num, 10);
		if (isNaN(target)) {
			setOutput("Please enter a valid number");
			return;
		}

		// Check if target is within array bounds
		if (target < blocks[0].value || target > blocks[blocks.length - 1].value) {
			setOutput("Element Not Found (out of range)");
			return;
		}

		// Reset state
		setIsSearching(true);
		setOutput("");
		setComparisons(0);
		setFoundIndex(-1);
		setCurrentMid(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setSearchDirection("");
		resetColors();

		let start = 0;
		let end = blocks.length - 1;
		let found = false;

		while (start <= end) {
			const mid = Math.floor((start + end) / 2);
			setCurrentMid(mid);
			setCurrentStart(start);
			setCurrentEnd(end);
			setComparisons(prev => prev + 1);

			// Highlight mid point
			const updatedBlocks = [...blocks];
			updatedBlocks[mid] = {
				...updatedBlocks[mid],
				status: "mid",
			};
			
			// Highlight search range
			for (let i = start; i <= end; i++) {
				if (i !== mid) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: i < mid ? "left-range" : "right-range",
					};
				}
			}
			
			setBlocks(updatedBlocks);
			await new Promise((resolve) => setTimeout(resolve, speed));

			const midValue = updatedBlocks[mid].value;

			if (midValue === target) {
				setOutput(`Element Found at index ${mid}`);
				setFoundIndex(mid);
				updatedBlocks[mid] = {
					...updatedBlocks[mid],
					status: "found",
				};
				
				// Reset other blocks
				for (let i = 0; i < updatedBlocks.length; i++) {
					if (i !== mid) {
						updatedBlocks[i] = {
							...updatedBlocks[i],
							status: "default",
						};
					}
				}
				
				setBlocks(updatedBlocks);
				found = true;
				break;
			}

			// Determine search direction
			if (midValue < target) {
				setSearchDirection("right");
				// Eliminate left half
				for (let i = start; i <= mid; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				start = mid + 1;
			} else {
				setSearchDirection("left");
				// Eliminate right half
				for (let i = mid; i <= end; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				end = mid - 1;
			}

			setBlocks(updatedBlocks);
			await new Promise((resolve) => setTimeout(resolve, speed));
		}

		if (!found) {
			setOutput("Element Not Found");
			// Mark all as eliminated
			const finalBlocks = blocks.map(block => ({
				...block,
				status: "eliminated",
			}));
			setBlocks(finalBlocks);
		}

		setIsSearching(false);
		setCurrentMid(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setSearchDirection("");
	};

	const getBlockColor = (status) => {
		switch (status) {
			case "mid":
				return "bg-gradient-to-t from-red-500 to-red-400";
			case "left-range":
				return "bg-gradient-to-t from-blue-400 to-blue-300";
			case "right-range":
				return "bg-gradient-to-t from-purple-400 to-purple-300";
			case "found":
				return "bg-gradient-to-t from-green-500 to-green-400";
			case "eliminated":
				return "bg-gradient-to-t from-gray-300 to-gray-200";
			default:
				return "bg-gradient-to-t from-indigo-500 to-indigo-400";
		}
	};

	const getBlockBorder = (status) => {
		if (status === "mid") {
			return "ring-4 ring-red-300 ring-offset-2";
		}
		if (status === "found") {
			return "ring-4 ring-green-300 ring-offset-2";
		}
		return "";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Animated Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
			</div>

			{/* Navigation Bar */}
			<nav className="relative bg-white/80 backdrop-blur-md shadow-lg">
				<div className="container mx-auto px-6 py-4 flex items-center justify-between">
					<Link 
						to="/" 
						className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
					>
						<FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
						<span className="font-semibold">Back to Home</span>
					</Link>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						Binary Search Visualizer
					</h1>
					<div className="w-24" /> {/* Spacer for centering */}
				</div>
			</nav>

			<div className="relative container mx-auto px-6 py-8">
				{/* Algorithm Info Card */}
				<div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
							<FaInfoCircle className="text-white text-2xl" />
						</div>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">About Binary Search</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Binary Search is an efficient searching algorithm that works on sorted arrays by repeatedly 
								dividing the search interval in half. It compares the target value with the middle element 
								and eliminates half of the remaining elements at each step.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div className="bg-blue-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Time Complexity</div>
									<div className="text-lg font-bold text-blue-600">O(log n)</div>
								</div>
								<div className="bg-indigo-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Space Complexity</div>
									<div className="text-lg font-bold text-indigo-600">O(1)</div>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Best Case</div>
									<div className="text-lg font-bold text-green-600">O(1)</div>
								</div>
							</div>
							<div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
								<p className="text-sm text-yellow-800">
									<strong>Note:</strong> Binary Search requires the array to be sorted. The array is automatically sorted when generated.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Visualization Area */}
					<div className="lg:col-span-2">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
								<FaSearch className="text-blue-600" />
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
													width: `${90 / numElements}%`,
												}}
											>
												{/* Value Label */}
												<div className={`text-xs font-bold mb-2 px-2 py-1 rounded-md transition-all duration-300 ${
													block.status === "mid" 
														? "bg-red-100 text-red-700 scale-110" 
														: block.status === "found"
														? "bg-green-100 text-green-700 scale-110"
														: block.status === "eliminated"
														? "bg-gray-100 text-gray-400"
														: block.status === "left-range"
														? "bg-blue-100 text-blue-700"
														: block.status === "right-range"
														? "bg-purple-100 text-purple-700"
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
													className={`w-full transition-all duration-300 ease-in-out rounded-t-lg shadow-md ${getBlockColor(block.status)} ${getBlockBorder(block.status)}`}
													style={{
														height: `${(block.value / 100) * 250}px`,
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
									<div className="w-6 h-6 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded"></div>
									<span className="text-sm text-gray-600">Not in Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-blue-400 to-blue-300 rounded"></div>
									<span className="text-sm text-gray-600">Left Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-purple-400 to-purple-300 rounded"></div>
									<span className="text-sm text-gray-600">Right Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
									<span className="text-sm text-gray-600">Mid Point</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-gray-300 to-gray-200 rounded"></div>
									<span className="text-sm text-gray-600">Eliminated</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-green-500 to-green-400 rounded"></div>
									<span className="text-sm text-gray-600">Found</span>
								</div>
							</div>
						</div>
					</div>

					{/* Controls Panel */}
					<div className="space-y-6">
						{/* Search Input */}
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Search Value
							</label>
							<input
								type="number"
								placeholder="Enter number to search"
								value={num}
								onChange={(e) => setNum(e.target.value)}
								disabled={isSearching}
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
							/>
						</div>

						{/* Speed Control */}
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Speed: {speed}ms
							</label>
							<input
								type="range"
								min="50"
								max="1000"
								step="50"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								disabled={isSearching}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
								style={{
									background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(speed - 50) / 9.5}%, #e5e7eb ${(speed - 50) / 9.5}%, #e5e7eb 100%)`
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
								Array Size: {numElements}
							</label>
							<input
								type="range"
								min="5"
								max="50"
								step="1"
								value={numElements}
								onChange={(e) => setNumElements(Number(e.target.value))}
								disabled={isSearching}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
								style={{
									background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((numElements - 5) / 45) * 100}%, #e5e7eb ${((numElements - 5) / 45) * 100}%, #e5e7eb 100%)`
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
								onClick={binarySearch}
								disabled={isSearching || !num}
								className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
							>
								<FaPlay /> {isSearching ? "Searching..." : "Start Search"}
							</button>
							<button
								onClick={generateArray}
								disabled={isSearching}
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
									<span className="text-gray-600">Comparisons:</span>
									<span className="text-xl font-bold text-blue-600">{comparisons}</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Current Range:</span>
									<span className="text-xl font-bold text-indigo-600">
										{currentStart >= 0 && currentEnd >= 0 
											? `[${currentStart} - ${currentEnd}]` 
											: "-"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Mid Index:</span>
									<span className="text-xl font-bold text-purple-600">
										{currentMid >= 0 ? currentMid : "-"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Array Size:</span>
									<span className="text-xl font-bold text-indigo-600">{numElements}</span>
								</div>
								{searchDirection && (
									<div className="mt-4 pt-3 border-t border-gray-200">
										<div className="text-sm text-gray-600 mb-1">Search Direction:</div>
										<div className="flex items-center gap-2">
											{searchDirection === "left" ? (
												<FaArrowLeft className="text-red-600 text-xl" />
											) : (
												<FaArrowRight className="text-green-600 text-xl" />
											)}
											<span className="text-lg font-bold text-gray-800 capitalize">
												{searchDirection}
											</span>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Result Display */}
						<div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
							output.includes("Found")
								? "border-green-500 bg-green-50/50"
								: output.includes("Not Found")
								? "border-red-500 bg-red-50/50"
								: output
								? "border-yellow-500 bg-yellow-50/50"
								: "border-gray-200"
						}`}>
							<div className="flex items-center gap-3 mb-2">
								{output.includes("Found") ? (
									<FaCheckCircle className="text-green-600 text-2xl" />
								) : output.includes("Not Found") ? (
									<FaTimesCircle className="text-red-600 text-2xl" />
								) : null}
								<h3 className="text-lg font-bold text-gray-800">Result</h3>
							</div>
							<p className={`text-lg font-semibold ${
								output.includes("Found")
									? "text-green-600"
									: output.includes("Not Found")
									? "text-red-600"
									: output
									? "text-yellow-600"
									: "text-gray-400"
							}`}>
								{output || "Ready to search"}
							</p>
							{foundIndex >= 0 && (
								<p className="text-sm text-gray-600 mt-2">
									Found at position {foundIndex + 1} (index {foundIndex})
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BinarySearch;
