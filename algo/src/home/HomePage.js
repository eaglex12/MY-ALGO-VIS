import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	useEffect(() => {
		const scrollToElement = (id) => {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		};

		document.querySelectorAll(".social-links a").forEach((anchor) => {
			anchor.addEventListener("click", (e) => {
				e.preventDefault();
				const id = e.target.getAttribute("href").substring(1);
				scrollToElement(id);
			});
		});
	}, []);

	const AlgorithmBox = ({ to, imgSrc, alt, heading, description }) => (
		<Link
			to={to}
			className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
		>
			<img src={imgSrc} alt={alt} className="w-full h-48 object-cover" />
			<div className="p-4">
				<h3 className="text-xl font-semibold mb-2">{heading}</h3>
				<hr className="mb-2" />
				<p className="text-gray-600">{description}</p>
			</div>
		</Link>
	);

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-blue-600 text-white shadow-md">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Algorithm Visualizer</h1>
					<div className="space-x-4">
						<Link
							to="/linear-search"
							className="nav-link relative inline-block px-2 py-1"
						>
							<span className="relative z-10">Linear</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link
							to="/binary-search"
							className="nav-link relative inline-block px-2 py-1"
						>
							<span className="relative z-10">Binary</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link
							to="/ternary-search"
							className="nav-link relative inline-block px-2 py-1"
						>
							<span className="relative z-10">Ternary</span>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
						</Link>
					</div>
				</div>
			</nav>

			<div className="container mx-auto px-4 py-8">
				<h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
					Search Algorithms
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<AlgorithmBox
						to="/linear-search"
						imgSrc="ls.png"
						alt="Linear Search"
						heading="Linear Search"
						description="Sequential element checking in a list until the desired element is found or the end is reached."
					/>
					<AlgorithmBox
						to="/binary-search"
						imgSrc="bs.png"
						alt="Binary Search"
						heading="Binary Search"
						description="Fast searching by repeatedly dividing the search space in half."
					/>
					<AlgorithmBox
						to="/ternary-search"
						imgSrc="ts.jpg"
						alt="Ternary Search"
						heading="Ternary Search"
						description="Improved binary search that divides the array into three parts for efficient searching."
					/>
				</div>

				<h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
					Sort Algorithms
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<AlgorithmBox
						to="/bubble-sort"
						imgSrc="bubble.png"
						alt="Bubble Sort"
						heading="Bubble Sort"
						description="Simple sorting by repeatedly stepping through the list, comparing and swapping adjacent elements."
					/>
					<AlgorithmBox
						to="/quick-sort"
						imgSrc="qs.webp"
						alt="Quick Sort"
						heading="Quick Sort"
						description="Efficient sorting by dividing the input array into smaller sub-arrays and recursively sorting them."
					/>
					<AlgorithmBox
						to="/insert-sort"
						imgSrc="is.jpg"
						alt="Insertion Sort"
						heading="Insertion Sort"
						description="Simple sorting that builds the final sorted array one item at a time."
					/>
				</div>

				<h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
					Other Algorithms
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<a
						href={process.env.PUBLIC_URL + "/Scheduling/algo.html"}
						className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="sched.jpg"
							alt="Scheduler"
							className="w-full h-48 object-cover"
						/>
						<div className="p-4">
							<h3 className="text-xl font-semibold mb-2">Scheduler</h3>
							<hr className="mb-2" />
							<p className="text-gray-600">
								Efficient task scheduling and resource allocation algorithm.
							</p>
						</div>
					</a>
				</div>
			</div>

			<footer className="bg-gray-800 text-white py-6">
				<div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
					<p>&copy; 2023 Algorithm Visualizer. All rights reserved.</p>
					<div className="social-links mt-4 md:mt-0 space-x-4">
						<a
							href="#"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-400 transition-colors duration-300"
						>
							Facebook
						</a>
						<a
							href="#"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-400 transition-colors duration-300"
						>
							Twitter
						</a>
						<a
							href="#"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-blue-400 transition-colors duration-300"
						>
							GitHub
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
