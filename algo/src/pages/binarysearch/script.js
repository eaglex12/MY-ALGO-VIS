import React, { useState, useEffect } from "react";

const BinarySearch = () => {
	const [output, setOutput] = useState("");
	const [num, setNum] = useState("");
	const [speed, setSpeed] = useState(300);
	const [numElements, setNumElements] = useState(20);

	useEffect(() => {
		generateArray();
	}, [numElements]);

	const generateArray = () => {
		const container = document.getElementById("array");
		container.innerHTML = "";

		const arr = [];

		for (let i = 0; i < numElements; i++) {
			const val = Math.ceil(Math.random() * 100);
			arr.push(val);
		}

		arr.sort((a, b) => a - b);

		arr.forEach((value, i) => {
			const array_ele = document.createElement("div");
			array_ele.classList.add(
				"absolute",
				"bottom-0",
				"w-7",
				"bg-indigo-500",
				"transition-all",
				"duration-300",
				"ease-in-out",
				"rounded-t-md"
			);
			array_ele.style.height = `${value * 3}px`;
			array_ele.style.transform = `translateX(${i * 30}px)`;

			const array_ele_label = document.createElement("div");
			array_ele_label.classList.add(
				"absolute",
				"bottom-full",
				"left-1/2",
				"transform",
				"-translate-x-1/2",
				"text-xs",
				"text-gray-600"
			);
			array_ele_label.innerText = value;

			array_ele.appendChild(array_ele_label);
			container.appendChild(array_ele);
		});
	};

	const binarySearch = async () => {
		const blocks = document.querySelectorAll("#array > div");
		const target = parseInt(num);

		blocks.forEach((block) => {
			block.classList.remove("bg-red-500", "bg-green-500");
			block.classList.add("bg-indigo-500");
		});

		setOutput("");

		let start = 0;
		let end = blocks.length - 1;
		let flag = false;

		while (start <= end) {
			const mid = Math.floor((start + end) / 2);
			blocks[mid].classList.remove("bg-indigo-500");
			blocks[mid].classList.add("bg-red-500");
			const value = parseInt(blocks[mid].childNodes[0].innerText);

			await new Promise((resolve) => setTimeout(resolve, speed));

			if (value === target) {
				setOutput("Element Found");
				blocks[mid].classList.remove("bg-red-500");
				blocks[mid].classList.add("bg-green-500");
				flag = true;
				break;
			}

			if (value < target) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}

			blocks[mid].classList.remove("bg-red-500");
			blocks[mid].classList.add("bg-indigo-500");
		}

		if (!flag) {
			setOutput("Element Not Found");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
				<div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
					<h1 className="text-3xl font-bold text-white">
						Binary Search Visualizer
					</h1>
				</div>

				<div className="p-6">
					<div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Speed: {speed} ms
							</label>
							<input
								type="range"
								min="100"
								max="1000"
								step="100"
								value={speed}
								onChange={(e) => setSpeed(Number(e.target.value))}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Number of Elements: {numElements}
							</label>
							<input
								type="range"
								min="5"
								max="50"
								value={numElements}
								onChange={(e) => setNumElements(Number(e.target.value))}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
						</div>
					</div>

					<div id="array" className="relative h-80 mb-8"></div>

					<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
						<input
							type="number"
							placeholder="Number to be Searched"
							value={num}
							onChange={(e) => setNum(e.target.value)}
							className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
						<div className="flex space-x-4">
							<button
								onClick={binarySearch}
								className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
							>
								Search
							</button>
							<button
								onClick={generateArray}
								className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
							>
								Generate New Array
							</button>
						</div>
					</div>

					<div
						className={`mt-6 text-center text-lg font-semibold ${
							output === "Element Found" ? "text-green-600" : "text-red-600"
						}`}
					>
						{output}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BinarySearch;
