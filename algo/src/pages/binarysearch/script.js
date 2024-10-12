import React, { useState, useEffect } from "react";

const BinarySearch = () => {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [speed, setSpeed] = useState(300);
	const [numElements, setNumElements] = useState(20);
	const [blocks, setBlocks] = useState([]);

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

		const newBlocks = arr.map((value) => ({
			value,
			style: {
				height: `${value * 3}px`,
				backgroundColor: "#6b5b95",
			},
		}));
		setBlocks(newBlocks);
	};

	const binarySearch = async () => {
		const target = parseInt(num);
		setOutput("");

		let start = 0;
		let end = blocks.length - 1;
		let flag = false;

		while (start <= end) {
			const mid = Math.floor((start + end) / 2);

			setBlocks((prevBlocks) => {
				const updatedBlocks = [...prevBlocks];
				updatedBlocks[mid] = {
					...updatedBlocks[mid],
					style: { ...updatedBlocks[mid].style, backgroundColor: "#FF4949" },
				};
				return updatedBlocks;
			});

			await new Promise((resolve) => setTimeout(resolve, speed));

			const value = blocks[mid].value;

			if (value === target) {
				setOutput("Element Found");
				setBlocks((prevBlocks) => {
					const updatedBlocks = [...prevBlocks];
					updatedBlocks[mid] = {
						...updatedBlocks[mid],
						style: { ...updatedBlocks[mid].style, backgroundColor: "#13CE66" },
					};
					return updatedBlocks;
				});
				flag = true;
				break;
			}

			if (value < target) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}

			setBlocks((prevBlocks) => {
				const updatedBlocks = [...prevBlocks];
				updatedBlocks[mid] = {
					...updatedBlocks[mid],
					style: { ...updatedBlocks[mid].style, backgroundColor: "#6b5b95" },
				};
				return updatedBlocks;
			});
		}

		if (!flag) {
			setOutput("Element Not Found");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
					<h1 className="text-3xl font-bold text-white">
						Binary Search Visualizer
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
											style={block.style}
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
								onClick={binarySearch}
								className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
							>
								Search
							</button>
							<button
								onClick={generateArray}
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

export default BinarySearch;
