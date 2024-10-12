"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";

export default function BubbleSort() {
	const [blocks, setBlocks] = useState([]);
	const [speed, setSpeed] = useState(100);
	const [numElements, setNumElements] = useState(20);
	const [sorting, setSorting] = useState(false);

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const newArray = [];
		for (let i = 0; i < numElements; i++) {
			const value = Math.ceil(Math.random() * 100);
			newArray.push({ height: value * 3, state: "none", value });
		}
		setBlocks(newArray);
	};

	const bubbleSort = async () => {
		setSorting(true);

		let newArray = [...blocks];

		for (let i = 0; i < newArray.length; i++) {
			let currentMaxIndex = 0;

			for (let j = 0; j < newArray.length - i - 1; j++) {
				newArray[j].state = "active";
				newArray[j + 1].state = "active";
				setBlocks([...newArray]);

				await new Promise((resolve) => setTimeout(resolve, speed));
				const value1 = newArray[j].height;
				const value2 = newArray[j + 1].height;

				if (value1 > value2) {
					let temp = newArray[j];
					newArray[j] = newArray[j + 1];
					newArray[j + 1] = temp;

					currentMaxIndex = j + 1;
				}

				newArray[j].state = "none";
				newArray[j + 1].state = "none";
				setBlocks([...newArray]);
			}

			newArray[newArray.length - i - 1].state = "done";
			newArray[currentMaxIndex].state = "max";
			setBlocks([...newArray]);
		}

		setSorting(false);
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
				<div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
					<h1 className="text-3xl font-bold text-white">
						Bubble Sort Visualizer
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
											className={`w-full transition-all duration-300 ease-in-out rounded-t-md ${
												block.state === "active"
													? "bg-yellow-400"
													: block.state === "done"
													? "bg-green-500"
													: block.state === "max"
													? "bg-red-500"
													: "bg-blue-500"
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
								Array Size: {numElements}
							</label>
							<input
								type="range"
								min="5"
								max="50"
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
								className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300 disabled:opacity-50"
							>
								Generate New Array
							</button>
							<button
								onClick={bubbleSort}
								disabled={sorting}
								className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50"
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
