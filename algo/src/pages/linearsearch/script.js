import React, { useState, useEffect } from "react";

const LinearSearch = () => {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [blocks, setBlocks] = useState([]);
	const [speed, setSpeed] = useState(300);
	const [numElements, setNumElements] = useState(20);

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const newBlocks = [];
		for (let i = 0; i < numElements; i++) {
			const value = Math.ceil(Math.random() * 100);
			newBlocks.push({
				value,
				style: {
					height: `${value * 3}px`,
				},
			});
		}
		setBlocks(newBlocks);
	};

	const linearSearch = async () => {
		setOutput("");

		for (let i = 0; i < blocks.length; i += 1) {
			const updatedBlocks = [...blocks];
			updatedBlocks[i] = {
				...updatedBlocks[i],
				style: {
					...updatedBlocks[i].style,
					backgroundColor: "#FF4949",
				},
			};
			setBlocks(updatedBlocks);

			await new Promise((resolve) => setTimeout(resolve, speed));

			const value = updatedBlocks[i].value;
			if (value == num) {
				setOutput("Element Found");
				updatedBlocks[i] = {
					...updatedBlocks[i],
					style: {
						...updatedBlocks[i].style,
						backgroundColor: "#13CE66",
					},
				};
				setBlocks(updatedBlocks);
				return;
			}

			updatedBlocks[i] = {
				...updatedBlocks[i],
				style: {
					...updatedBlocks[i].style,
					backgroundColor: "#6b5b95",
				},
			};

			setBlocks(updatedBlocks);
		}

		setOutput("Element Not Found");
	};

	const handleGenerateArray = () => {
		generateArray();
		setOutput("");
		setNum("");
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
					<h1 className="text-3xl font-bold text-white">
						Linear Search Visualizer
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
											width: `${90 / numElements}%`,
										}}
									>
										<div className="text-xs text-gray-600 mb-1">
											{block.value}
										</div>
										<div
											className="w-full transition-all duration-300 ease-in-out rounded-t-md"
											style={{
												...block.style,
												backgroundColor:
													block.style.backgroundColor || "#6b5b95",
											}}
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
								min="100"
								max="1000"
								step="100"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="mb-6 flex items-center">
							<label className="text-sm font-medium text-gray-700 mr-4 w-32">
								Elements: {numElements}
							</label>
							<input
								type="range"
								min="5"
								max="50"
								value={numElements}
								onChange={(e) => setNumElements(Number(e.target.value))}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div className="mb-6">
							<input
								type="number"
								placeholder="Number to be Searched"
								value={num}
								onChange={(e) => setNum(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div className="flex flex-col space-y-4">
							<button
								onClick={linearSearch}
								className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
							>
								Search
							</button>
							<button
								onClick={handleGenerateArray}
								className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
							>
								Generate New Array
							</button>
						</div>
						<div
							className={`mt-6 text-center text-lg font-semibold ${
								output === "Element Found"
									? "text-green-600"
									: output === "Element Not Found"
									? "text-red-600"
									: "text-gray-600"
							}`}
						>
							{output}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LinearSearch;
