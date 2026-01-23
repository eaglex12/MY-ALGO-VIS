import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
	FaSearch, 
	FaHome, 
	FaPlay, 
	FaRedo, 
	FaInfoCircle,
	FaCheckCircle,
	FaTimesCircle,
	FaArrowLeft
} from "react-icons/fa";

const LinearSearch = () => {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [blocks, setBlocks] = useState([]);
	const [speed, setSpeed] = useState(300);
	const [numElements, setNumElements] = useState(20);
	const [isSearching, setIsSearching] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [comparisons, setComparisons] = useState(0);
	const [foundIndex, setFoundIndex] = useState(-1);

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const newBlocks = [];
		for (let i = 0; i < numElements; i++) {
			const value = Math.ceil(Math.random() * 100);
			newBlocks.push({
				value,
				index: i,
				status: "default", // default, checking, found, checked
			});
		}
		setBlocks(newBlocks);
		setOutput("");
		setCurrentIndex(-1);
		setFoundIndex(-1);
		setComparisons(0);
		setIsSearching(false);
	};

	const resetColors = () => {
		const resetBlocks = blocks.map(block => ({
			...block,
			status: "default"
		}));
		setBlocks(resetBlocks);
	};

	const linearSearch = async () => {
		// Validation
		if (!num || num.trim() === "") {
			setOutput("Please enter a number to search");
			return;
		}

		if (isSearching) {
			return; // Prevent multiple simultaneous searches
		}

		const searchValue = parseInt(num, 10);
		if (isNaN(searchValue)) {
			setOutput("Please enter a valid number");
			return;
		}

		// Reset state
		setIsSearching(true);
		setOutput("");
		setComparisons(0);
		setFoundIndex(-1);
		setCurrentIndex(-1);
		resetColors();

		// Perform linear search
		for (let i = 0; i < blocks.length; i++) {
			setCurrentIndex(i);
			setComparisons(i + 1);

			// Mark current block as checking
			const updatedBlocks = [...blocks];
			updatedBlocks[i] = {
				...updatedBlocks[i],
				status: "checking",
			};
			setBlocks(updatedBlocks);

			await new Promise((resolve) => setTimeout(resolve, speed));

			// Check if found
			if (updatedBlocks[i].value === searchValue) {
				setOutput(`Element Found at index ${i}`);
				setFoundIndex(i);
				updatedBlocks[i] = {
					...updatedBlocks[i],
					status: "found",
				};
				setBlocks(updatedBlocks);
				setIsSearching(false);
				setCurrentIndex(-1);
				return;
			}

			// Mark as checked (not found)
			updatedBlocks[i] = {
				...updatedBlocks[i],
				status: "checked",
			};
			setBlocks(updatedBlocks);
		}

		// Element not found
		setOutput("Element Not Found");
		setIsSearching(false);
		setCurrentIndex(-1);
	};

	const handleGenerateArray = () => {
		generateArray();
		setNum("");
	};

	const getBlockColor = (status) => {
		switch (status) {
			case "checking":
				return "bg-gradient-to-t from-red-500 to-red-400";
			case "found":
				return "bg-gradient-to-t from-green-500 to-green-400";
			case "checked":
				return "bg-gradient-to-t from-gray-400 to-gray-300";
			default:
				return "bg-gradient-to-t from-blue-500 to-blue-400";
		}
	};

	const getBlockBorder = (status, index) => {
		if (status === "checking") {
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
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
					<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Linear Search Visualizer
					</h1>
					<div className="w-24" /> {/* Spacer for centering */}
				</div>
			</nav>

			<div className="relative container mx-auto px-6 py-8">
				{/* Algorithm Info Card */}
				<div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
							<FaInfoCircle className="text-white text-2xl" />
						</div>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">About Linear Search</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Linear Search is a simple searching algorithm that checks each element in the array sequentially 
								until the target element is found or the end of the array is reached.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div className="bg-blue-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Time Complexity</div>
									<div className="text-lg font-bold text-blue-600">O(n)</div>
								</div>
								<div className="bg-purple-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Space Complexity</div>
									<div className="text-lg font-bold text-purple-600">O(1)</div>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Best Case</div>
									<div className="text-lg font-bold text-green-600">O(1)</div>
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
													block.status === "checking" 
														? "bg-red-100 text-red-700 scale-110" 
														: block.status === "found"
														? "bg-green-100 text-green-700 scale-110"
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
													className={`w-full transition-all duration-300 ease-in-out rounded-t-lg shadow-md ${getBlockColor(block.status)} ${getBlockBorder(block.status, index)}`}
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
									<div className="w-6 h-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded"></div>
									<span className="text-sm text-gray-600">Not Checked</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-red-500 to-red-400 rounded"></div>
									<span className="text-sm text-gray-600">Checking</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-gradient-to-t from-gray-400 to-gray-300 rounded"></div>
									<span className="text-sm text-gray-600">Checked (Not Found)</span>
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
									background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((numElements - 5) / 45) * 100}%, #e5e7eb ${((numElements - 5) / 45) * 100}%, #e5e7eb 100%)`
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
								onClick={linearSearch}
								disabled={isSearching || !num}
								className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
							>
								<FaPlay /> {isSearching ? "Searching..." : "Start Search"}
							</button>
							<button
								onClick={handleGenerateArray}
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
									<span className="text-gray-600">Current Index:</span>
									<span className="text-xl font-bold text-purple-600">
										{currentIndex >= 0 ? currentIndex : "-"}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Array Size:</span>
									<span className="text-xl font-bold text-indigo-600">{numElements}</span>
								</div>
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

export default LinearSearch;
