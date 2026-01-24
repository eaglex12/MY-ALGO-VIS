import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
	FaSearch, 
	FaSort, 
	FaCalendarAlt, 
	FaClock,
	FaGithub, 
	FaTwitter, 
	FaFacebook,
	FaCode,
	FaRocket
} from "react-icons/fa";

const HomePage = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	const AlgorithmBox = ({ to, imgSrc, alt, heading, description, icon: Icon, delay = 0 }) => (
		<Link
			to={to}
			className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="relative h-56 overflow-hidden">
				<img 
					src={imgSrc} 
					alt={alt} 
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				{Icon && (
					<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
						<Icon className="text-blue-600 text-xl" />
					</div>
				)}
			</div>
			<div className="p-6 flex-1 flex flex-col">
				<h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
					{heading}
				</h3>
				<div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
				<p className="text-gray-600 leading-relaxed flex-1">{description}</p>
				<div className="mt-4 text-blue-600 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
					Explore <FaRocket className="text-sm" />
				</div>
			</div>
		</Link>
	);

	const ExternalAlgorithmBox = ({ href, imgSrc, alt, heading, description, icon: Icon, delay = 0 }) => (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="relative h-56 overflow-hidden">
				<img 
					src={imgSrc} 
					alt={alt} 
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
				{Icon && (
					<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
						<Icon className="text-blue-600 text-xl" />
					</div>
				)}
			</div>
			<div className="p-6 flex-1 flex flex-col">
				<h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
					{heading}
				</h3>
				<div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
				<p className="text-gray-600 leading-relaxed flex-1">{description}</p>
				<div className="mt-4 text-blue-600 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
					Explore <FaRocket className="text-sm" />
				</div>
			</div>
		</a>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Animated Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
			</div>

			{/* Navigation */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled 
					? 'bg-white/80 backdrop-blur-md shadow-lg' 
					: 'bg-transparent'
			}`}>
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<Link to="/" className="flex items-center gap-3 group">
						<div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
							<FaCode className="text-white text-xl" />
						</div>
						<h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
							scrolled ? 'text-gray-800' : ''
						}`}>
							Algorithm Visualizer
						</h1>
					</Link>
					<div className="hidden md:flex space-x-2">
						<Link
							to="/linear-search"
							className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
						>
							<span className="relative z-10">Linear Search</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
						</Link>
						<Link
							to="/binary-search"
							className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
						>
							<span className="relative z-10">Binary Search</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
						</Link>
						<Link
							to="/ternary-search"
							className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
						>
							<span className="relative z-10">Ternary Search</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
						</Link>
						<Link
							to="/scheduling/fcfs"
							className="relative px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
						>
							<span className="relative z-10">Scheduling</span>
							<span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
						</Link>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-6">
				<div className="container mx-auto text-center">
					<div className="inline-block mb-4 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200">
						<span className="text-blue-700 font-semibold text-sm">Interactive Learning Platform</span>
					</div>
					<h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
						Master Algorithms
						<br />
						<span className="text-4xl md:text-6xl">Through Visualization</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
						Explore complex algorithms with interactive visualizations. Understand how search and sort algorithms work step by step.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							to="/linear-search"
							className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
						>
							<FaRocket /> Get Started
						</Link>
						<a
							href="#algorithms"
							className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200"
						>
							Explore Algorithms
						</a>
					</div>
				</div>
			</section>

			{/* Algorithms Section */}
			<div id="algorithms" className="relative container mx-auto px-6 py-16">
				{/* Search Algorithms */}
				<div className="mb-20">
					<div className="flex items-center gap-4 mb-8">
						<div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
							<FaSearch className="text-white text-2xl" />
						</div>
						<h2 className="text-4xl font-bold text-gray-800">
							Search Algorithms
						</h2>
						<div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<AlgorithmBox
							to="/linear-search"
							imgSrc="ls.png"
							alt="Linear Search"
							heading="Linear Search"
							description="Sequential element checking in a list until the desired element is found or the end is reached. Perfect for understanding basic search concepts."
							icon={FaSearch}
							delay={0}
						/>
						<AlgorithmBox
							to="/binary-search"
							imgSrc="bs.png"
							alt="Binary Search"
							heading="Binary Search"
							description="Fast searching by repeatedly dividing the search space in half. Learn the power of divide and conquer approach."
							icon={FaSearch}
							delay={100}
						/>
						<AlgorithmBox
							to="/ternary-search"
							imgSrc="ts.jpg"
							alt="Ternary Search"
							heading="Ternary Search"
							description="Improved binary search that divides the array into three parts for efficient searching. Advanced optimization technique."
							icon={FaSearch}
							delay={200}
						/>
					</div>
				</div>

				{/* Sort Algorithms */}
				<div className="mb-20">
					<div className="flex items-center gap-4 mb-8">
						<div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
							<FaSort className="text-white text-2xl" />
						</div>
						<h2 className="text-4xl font-bold text-gray-800">
							Sort Algorithms
						</h2>
						<div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<AlgorithmBox
							to="/bubble-sort"
							imgSrc="bubble.png"
							alt="Bubble Sort"
							heading="Bubble Sort"
							description="Simple sorting by repeatedly stepping through the list, comparing and swapping adjacent elements. Great for beginners."
							icon={FaSort}
							delay={0}
						/>
						<AlgorithmBox
							to="/quick-sort"
							imgSrc="qs.webp"
							alt="Quick Sort"
							heading="Quick Sort"
							description="Efficient sorting by dividing the input array into smaller sub-arrays and recursively sorting them. Industry standard algorithm."
							icon={FaSort}
							delay={100}
						/>
						<AlgorithmBox
							to="/insert-sort"
							imgSrc="is.jpg"
							alt="Insertion Sort"
							heading="Insertion Sort"
							description="Simple sorting that builds the final sorted array one item at a time. Efficient for small datasets."
							icon={FaSort}
							delay={200}
						/>
					</div>
				</div>

				{/* Scheduling Algorithms */}
				<div id="scheduling" className="mb-20">
					<div className="flex items-center gap-4 mb-8">
						<div className="p-3 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl shadow-lg">
							<FaClock className="text-white text-2xl" />
						</div>
						<h2 className="text-4xl font-bold text-gray-800">
							Scheduling Algorithms
						</h2>
						<div className="flex-1 h-1 bg-gradient-to-r from-teal-500 to-transparent rounded-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<AlgorithmBox
							to="/scheduling/fcfs"
							imgSrc="FCFS.webp"
							alt="FCFS"
							heading="FCFS"
							description="First Come First Serve: executes processes in arrival order. Simple non-preemptive scheduling that uses a FIFO queue."
							icon={FaClock}
							delay={0}
						/>
						<AlgorithmBox
							to="/scheduling/sjf"
							imgSrc="SJF.webp"
							alt="SJF"
							heading="SJF"
							description="Shortest Job First: selects the process with smallest burst time. Minimizes average waiting time, non-preemptive."
							icon={FaClock}
							delay={100}
						/>
						<AlgorithmBox
							to="/scheduling/round-robin"
							imgSrc="RRS.webp"
							alt="Round Robin"
							heading="Round Robin"
							description="Preemptive scheduling with a fixed time quantum. Fair CPU allocation—each process gets equal time slices. Prevents starvation."
							icon={FaClock}
							delay={200}
						/>
						<AlgorithmBox
							to="/scheduling/ljf"
							imgSrc="sched.jpg"
							alt="LJF"
							heading="LJF"
							description="Longest Job First: selects the process with largest burst time. Non-preemptive. Opposite of SJF; can increase waiting time for shorter jobs."
							icon={FaClock}
							delay={300}
						/>
						<AlgorithmBox
							to="/scheduling/srtf"
							imgSrc="sched.jpg"
							alt="SRTF"
							heading="SRTF"
							description="Shortest Remaining Time First: preemptive SJF. Runs the job with smallest remaining burst; preempts when a shorter job arrives. Can minimize average wait."
							icon={FaClock}
							delay={400}
						/>
						<AlgorithmBox
							to="/scheduling/lrtf"
							imgSrc="sched.jpg"
							alt="LRTF"
							heading="LRTF"
							description="Longest Remaining Time First: preemptive LJF. Runs the job with largest remaining burst; can preempt when a longer job arrives."
							icon={FaClock}
							delay={500}
						/>
						<AlgorithmBox
							to="/scheduling/hrrn"
							imgSrc="sched.jpg"
							alt="HRRN"
							heading="HRRN"
							description="Highest Response Ratio Next: RR = 1 + (Wait / Service). Picks the process with highest ratio; balances short jobs and prevents starvation. Non-preemptive."
							icon={FaClock}
							delay={600}
						/>
						<AlgorithmBox
							to="/scheduling/priority-nonpreemptive"
							imgSrc="sched.jpg"
							alt="Priority (Non-Preemptive)"
							heading="Priority (Non-Preemptive)"
							description="Runs the highest-priority process to completion. Each process has a priority; you choose if 1 is high or low. Non-preemptive."
							icon={FaClock}
							delay={700}
						/>
						<AlgorithmBox
							to="/scheduling/priority-preemptive"
							imgSrc="sched.jpg"
							alt="Priority (Preemptive)"
							heading="Priority (Preemptive)"
							description="Same as Priority Non-Preemptive but the running job can be preempted when a higher-priority process arrives. Preemptive."
							icon={FaClock}
							delay={800}
						/>
					</div>
				</div>

				{/* Other Algorithms */}
				<div>
					<div className="flex items-center gap-4 mb-8">
						<div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
							<FaCalendarAlt className="text-white text-2xl" />
						</div>
						<h2 className="text-4xl font-bold text-gray-800">
							Other Algorithms
						</h2>
						<div className="flex-1 h-1 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<ExternalAlgorithmBox
							href={process.env.PUBLIC_URL + "/Scheduling/algo.html"}
							imgSrc="sched.jpg"
							alt="Scheduler (Legacy)"
							heading="Scheduler (Legacy)"
							description="Full scheduling suite with FCFS, SJF, SRTF, Round Robin, Priority, HRRN and more. Opens in new tab."
							icon={FaCalendarAlt}
							delay={0}
						/>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-20">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
						<div>
							<div className="flex items-center gap-3 mb-4">
								<div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
									<FaCode className="text-white text-xl" />
								</div>
								<h3 className="text-2xl font-bold">Algorithm Visualizer</h3>
							</div>
							<p className="text-gray-400 leading-relaxed">
								Learn algorithms through interactive visualizations. Master the fundamentals of computer science.
							</p>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2">
								<li>
									<Link to="/linear-search" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Linear Search
									</Link>
								</li>
								<li>
									<Link to="/binary-search" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Binary Search
									</Link>
								</li>
								<li>
									<Link to="/quick-sort" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Quick Sort
									</Link>
								</li>
								<li>
									<Link to="/scheduling/fcfs" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										FCFS Scheduling
									</Link>
								</li>
								<li>
									<Link to="/scheduling/round-robin" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Round Robin
									</Link>
								</li>
								<li>
									<Link to="/scheduling/srtf" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										SRTF
									</Link>
								</li>
								<li>
									<Link to="/scheduling/hrrn" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										HRRN
									</Link>
								</li>
								<li>
									<Link to="/scheduling/priority-nonpreemptive" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Priority (Non-Preemptive)
									</Link>
								</li>
								<li>
									<Link to="/scheduling/priority-preemptive" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
										Priority (Preemptive)
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-4">Connect</h4>
							<div className="social-links flex gap-4">
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 bg-gray-700/50 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
								>
									<FaFacebook className="text-xl" />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 bg-gray-700/50 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
								>
									<FaTwitter className="text-xl" />
								</a>
								<a
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 bg-gray-700/50 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12"
								>
									<FaGithub className="text-xl" />
								</a>
							</div>
						</div>
					</div>
					<div className="border-t border-gray-700 pt-8 text-center">
						<p className="text-gray-400">
							&copy; {new Date().getFullYear()} Algorithm Visualizer. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
