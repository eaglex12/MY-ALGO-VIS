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

export default function TernarySearch() {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [speed, setSpeed] = useState(700);
	const [numElements, setNumElements] = useState(20);
	const [blocks, setBlocks] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [currentMid1, setCurrentMid1] = useState(-1);
	const [currentMid2, setCurrentMid2] = useState(-1);
	const [currentStart, setCurrentStart] = useState(-1);
	const [currentEnd, setCurrentEnd] = useState(-1);
	const [comparisons, setComparisons] = useState(0);
	const [foundIndex, setFoundIndex] = useState(-1);
	const [searchRegion, setSearchRegion] = useState(""); // "left", "middle", "right"

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
			status: "default", // default, mid1, mid2, left-range, middle-range, right-range, found, eliminated
		}));
		setBlocks(newBlocks);
		setOutput("");
		setCurrentMid1(-1);
		setCurrentMid2(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setComparisons(0);
		setFoundIndex(-1);
		setIsSearching(false);
		setSearchRegion("");
	};

	const resetColors = () => {
		const resetBlocks = blocks.map(block => ({
			...block,
			status: "default"
		}));
		setBlocks(resetBlocks);
	};

	const ternarySearch = async () => {
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
		if (blocks.length === 0 || target < blocks[0].value || target > blocks[blocks.length - 1].value) {
			setOutput("Element Not Found (out of range)");
			return;
		}

		// Reset state
		setIsSearching(true);
		setOutput("");
		setComparisons(0);
		setFoundIndex(-1);
		setCurrentMid1(-1);
		setCurrentMid2(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setSearchRegion("");
		resetColors();

		let start = 0;
		let end = blocks.length - 1;
		let found = false;

		while (start <= end) {
			const mid1 = Math.floor(start + (end - start) / 3);
			const mid2 = Math.floor(end - (end - start) / 3);
			
			setCurrentMid1(mid1);
			setCurrentMid2(mid2);
			setCurrentStart(start);
			setCurrentEnd(end);
			setComparisons(prev => prev + 1);

			// Highlight mid points and ranges
			const updatedBlocks = [...blocks];
			updatedBlocks[mid1] = {
				...updatedBlocks[mid1],
				status: "mid1",
			};
			updatedBlocks[mid2] = {
				...updatedBlocks[mid2],
				status: "mid2",
			};
			
			// Highlight search ranges
			for (let i = start; i <= end; i++) {
				if (i === mid1 || i === mid2) continue;
				if (i < mid1) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "left-range",
					};
				} else if (i > mid2) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "right-range",
					};
				} else {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "middle-range",
					};
				}
			}
			
			setBlocks(updatedBlocks);
			await new Promise((resolve) => setTimeout(resolve, speed));

			const value1 = updatedBlocks[mid1].value;
			const value2 = updatedBlocks[mid2].value;

			// Check if found at mid1
			if (value1 === target) {
				setOutput(`Element Found at index ${mid1}`);
				setFoundIndex(mid1);
				updatedBlocks[mid1] = {
					...updatedBlocks[mid1],
					status: "found",
				};
				
				// Reset other blocks
				for (let i = 0; i < updatedBlocks.length; i++) {
					if (i !== mid1) {
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

			// Check if found at mid2
			if (value2 === target) {
				setOutput(`Element Found at index ${mid2}`);
				setFoundIndex(mid2);
				updatedBlocks[mid2] = {
					...updatedBlocks[mid2],
					status: "found",
				};
				
				// Reset other blocks
				for (let i = 0; i < updatedBlocks.length; i++) {
					if (i !== mid2) {
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

			// Determine search region
			if (target < value1) {
				setSearchRegion("left");
				// Eliminate middle and right thirds
				for (let i = mid1; i <= end; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				end = mid1 - 1;
			} else if (target > value2) {
				setSearchRegion("right");
				// Eliminate left and middle thirds
				for (let i = start; i <= mid2; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				start = mid2 + 1;
			} else {
				setSearchRegion("middle");
				// Eliminate left and right thirds
				for (let i = start; i < mid1; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				for (let i = mid2 + 1; i <= end; i++) {
					updatedBlocks[i] = {
						...updatedBlocks[i],
						status: "eliminated",
					};
				}
				start = mid1 + 1;
				end = mid2 - 1;
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
		setCurrentMid1(-1);
		setCurrentMid2(-1);
		setCurrentStart(-1);
		setCurrentEnd(-1);
		setSearchRegion("");
	};

	const getBlockColor = (status) => {
		switch (status) {
			case "mid1":
				return "bg-gradient-to-t from-red-500 to-red-400";
			case "mid2":
				return "bg-gradient-to-t from-orange-500 to-orange-400";
			case "left-range":
				return "bg-gradient-to-t from-blue-400 to-blue-300";
			case "middle-range":
				return "bg-gradient-to-t from-purple-400 to-purple-300";
			case "right-range":
				return "bg-gradient-to-t from-indigo-400 to-indigo-300";
			case "found":
				return "bg-gradient-to-t from-green-500 to-green-400";
			case "eliminated":
				return "bg-gradient-to-t from-gray-300 to-gray-200";
			default:
				return "bg-gradient-to-t from-teal-500 to-teal-400";
		}
	};

	const getBlockBorder = (status) => {
		if (status === "mid1" || status === "mid2") {
			return "ring-4 ring-orange-300 ring-offset-2";
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
				<div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
			</div>

			{/* Navigation Bar */}
			<nav className="relative bg-white/80 backdrop-blur-md shadow-lg">
				<div className="container mx-auto px-6 py-4 flex items-center justify-between">
					<Link 
						to="/" 
						className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors duration-300 group"
					>
						<FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
						<span className="font-semibold">Back to Home</span>
					</Link>
					<h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
						Ternary Search Visualizer
					</h1>
					<div className="w-24" /> {/* Spacer for centering */}
				</div>
			</nav>

			<div className="relative container mx-auto px-6 py-8">
				{/* Algorithm Info Card */}
				<div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl shadow-lg">
							<FaInfoCircle className="text-white text-2xl" />
						</div>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">About Ternary Search</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Ternary Search is an advanced searching algorithm that divides the array into three parts 
								instead of two. It uses two mid points (mid1 and mid2) to divide the search space into 
								three regions: left, middle, and right. This can reduce the number of comparisons compared 
								to binary search in some cases.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div className="bg-teal-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Time Complexity</div>
									<div className="text-lg font-bold text-teal-600">O(log₃ n)</div>
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
									<strong>Note:</strong> Ternary Search requires the array to be sorted. The array is automatically sorted when generated. 
									While it has better theoretical complexity, in practice binary search is often faster due to fewer comparisons per iteration.
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
								<FaSearch className="text-teal-600" />
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
													block.status === "mid1" || block.status === "mid2"
														? "bg-orange-100 text-orange-700 scale-110" 
														: block.status === "found"
														? "bg-green-100 text-green-700 scale-110"
														: block.status === "eliminated"
														? "bg-gray-100 text-gray-400"
														: block.status === "left-range"
														? "bg-blue-100 text-blue-700"
														: block.status === "middle-range"
														? "bg-purple-100 text-purple-700"
														: block.status === "right-range"
														? "bg-indigo-100 text-indigo-700"
														: "bg-gray-100 text-gray-600"
												}`}>
													{block.value}
													{(block.status === "mid1" || block.status === "mid2") && (
														<span className="ml-1 text-xs">
															{block.status === "mid1" ? "M1" : "M2"}
														</span>
													)}
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
									<div className="w-6 h-6 bg-gradient-to-t from-teal-500 to-teal-400 rounded"></div>
									<span className="text-sm text-gray-600">Not in Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-blue-400 to-blue-300 rounded"></div>
									<span className="text-sm text-gray-600">Left Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-purple-400 to-purple-300 rounded"></div>
									<span className="text-sm text-gray-600">Middle Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded"></div>
									<span className="text-sm text-gray-600">Right Range</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
									<span className="text-sm text-gray-600">Mid1 (M1)</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-orange-500 to-orange-400 rounded"></div>
									<span className="text-sm text-gray-600">Mid2 (M2)</span>
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
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
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
									background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(speed - 50) / 9.5}%, #e5e7eb ${(speed - 50) / 9.5}%, #e5e7eb 100%)`
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
								onClick={ternarySearch}
								disabled={isSearching || !num}
								className="w-full px-6 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
									<span className="text-xl font-bold text-teal-600">{comparisons}</span>
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
									<span className="text-gray-600">Mid1 Index:</span>
									<span className="text-xl font-bold text-red-600">
										{currentMid1 >= 0 ? currentMid1 : "-"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Mid2 Index:</span>
									<span className="text-xl font-bold text-orange-600">
										{currentMid2 >= 0 ? currentMid2 : "-"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Array Size:</span>
									<span className="text-xl font-bold text-indigo-600">{numElements}</span>
								</div>
								{searchRegion && (
									<div className="mt-4 pt-3 border-t border-gray-200">
										<div className="text-sm text-gray-600 mb-1">Search Region:</div>
										<div className="flex items-center gap-2">
											{searchRegion === "left" ? (
												<FaArrowLeft className="text-blue-600 text-xl" />
											) : searchRegion === "right" ? (
												<FaArrowRight className="text-indigo-600 text-xl" />
											) : (
												<FaArrowDown className="text-purple-600 text-xl" />
											)}
											<span className="text-lg font-bold text-gray-800 capitalize">
												{searchRegion}
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
}
