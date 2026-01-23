import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
	FaArrowLeft,
	FaPlay,
	FaRedo,
	FaInfoCircle,
	FaPlus,
	FaMinus
} from "react-icons/fa";
import { Input, Utility, Output, TimeLog, setAlgorithmNameType, setInput, setUtility, setOutput, moveElement } from "./utils";

const RoundRobin = () => {
	const [processes, setProcesses] = useState([
		{ id: 1, arrivalTime: 0, burstTime: 5 }
	]);
	const [contextSwitch, setContextSwitch] = useState(0);
	const [timeQuantum, setTimeQuantum] = useState(2);
	const [output, setOutput] = useState(null);
	const [isCalculating, setIsCalculating] = useState(false);

	const addProcess = () => {
		setProcesses([...processes, { 
			id: processes.length + 1, 
			arrivalTime: 0, 
			burstTime: 5 
		}]);
	};

	const removeProcess = () => {
		if (processes.length > 1) {
			setProcesses(processes.slice(0, -1));
		}
	};

	const updateProcess = (index, field, value) => {
		const updated = [...processes];
		updated[index][field] = Math.max(0, parseInt(value) || 0);
		if (field === 'burstTime' && updated[index][field] < 1) updated[index][field] = 1;
		setProcesses(updated);
	};

	const CPUScheduler = (input, utility, output) => {
		const updateReadyQueue = (currentTimeLog) => {
			const candidatesRemain = currentTimeLog.remain.filter(
				(element) => input.arrivalTime[element] <= currentTimeLog.time
			);
			if (candidatesRemain.length > 0) {
				currentTimeLog.move.push(0);
			}
			const candidatesBlock = currentTimeLog.block.filter(
				(element) => utility.returnTime[element] <= currentTimeLog.time
			);
			if (candidatesBlock.length > 0) {
				currentTimeLog.move.push(5);
			}
			const candidates = [...candidatesRemain, ...candidatesBlock];
			candidates.sort((a, b) => utility.returnTime[a] - utility.returnTime[b]);
			candidates.forEach(element => {
				moveElement(element, currentTimeLog.remain, currentTimeLog.ready);
				moveElement(element, currentTimeLog.block, currentTimeLog.ready);
			});
			output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
			currentTimeLog.move = [];
		};

		let currentTimeLog = new TimeLog();
		currentTimeLog.remain = [...input.processId];
		output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
		currentTimeLog.move = [];
		currentTimeLog.time++;
		let lastFound = -1;

		while (utility.done.some((element) => element == false)) {
			updateReadyQueue(currentTimeLog);
			let found = -1;
			
			if (currentTimeLog.running.length == 1) {
				found = currentTimeLog.running[0];
			} else if (currentTimeLog.ready.length > 0) {
				found = currentTimeLog.ready[0];
				utility.remainingTimeRunning[found] = Math.min(
					utility.remainingProcessTime[found][utility.currentProcessIndex[found]], 
					input.timeQuantum
				);
				
				moveElement(found, currentTimeLog.ready, currentTimeLog.running);
				currentTimeLog.move.push(1);
				output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
				currentTimeLog.move = [];
				
				if (utility.start[found] == false) {
					utility.start[found] = true;
					output.responseTime[found] = currentTimeLog.time - input.arrivalTime[found];
				}
			}
			
			currentTimeLog.time++;
			
			if (found != -1) {
				output.schedule.push([found + 1, 1]);
				utility.remainingProcessTime[found][utility.currentProcessIndex[found]]--;
				utility.remainingBurstTime[found]--;
				utility.remainingTimeRunning[found]--;

				if (utility.remainingTimeRunning[found] == 0) {
					if (utility.remainingProcessTime[found][utility.currentProcessIndex[found]] == 0) {
						utility.currentProcessIndex[found]++;
						if (utility.currentProcessIndex[found] == input.processTimeLength[found]) {
							utility.done[found] = true;
							output.completionTime[found] = currentTimeLog.time;
							moveElement(found, currentTimeLog.running, currentTimeLog.terminate);
							currentTimeLog.move.push(2);
						} else {
							utility.returnTime[found] = currentTimeLog.time + input.processTime[found][utility.currentProcessIndex[found]];
							utility.currentProcessIndex[found]++;
							moveElement(found, currentTimeLog.running, currentTimeLog.block);
							currentTimeLog.move.push(4);
						}
						output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
						currentTimeLog.move = [];
						updateReadyQueue(currentTimeLog);
					} else {
						updateReadyQueue(currentTimeLog);
						moveElement(found, currentTimeLog.running, currentTimeLog.ready);
						currentTimeLog.move.push(3);
						output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
						currentTimeLog.move = [];
					}
					output.schedule.push([-2, input.contextSwitch]);
					for (let i = 0; i < input.contextSwitch; i++, currentTimeLog.time++) {
						updateReadyQueue(currentTimeLog);
					}
					if (input.contextSwitch > 0) {
						output.contextSwitches++;
					}
				}
			} else {
				output.schedule.push([-1, 1]);
				lastFound = -1;
			}
			output.timeLog.push(JSON.parse(JSON.stringify(currentTimeLog)));
		}
		output.schedule.pop();
	};

	const calculate = () => {
		setIsCalculating(true);
		
		const input = new Input();
		const processData = processes.map(p => ({
			priority: 1,
			arrivalTime: p.arrivalTime,
			burstTimes: [p.burstTime]
		}));
		
		setInput(input, processData);
		setAlgorithmNameType(input, 'rr');
		input.contextSwitch = contextSwitch;
		input.timeQuantum = timeQuantum;
		
		const utility = new Utility();
		setUtility(input, utility);
		
		const output = new Output();
		CPUScheduler(input, utility, output);
		setOutput(input, output);
		
		setOutput(output);
		setIsCalculating(false);
	};

	const reset = () => {
		setProcesses([{ id: 1, arrivalTime: 0, burstTime: 5 }]);
		setContextSwitch(0);
		setTimeQuantum(2);
		setOutput(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
			</div>

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
						Round Robin Scheduling
					</h1>
					<div className="w-24" />
				</div>
			</nav>

			<div className="relative container mx-auto px-6 py-8">
				<div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
							<FaInfoCircle className="text-white text-2xl" />
						</div>
						<div className="flex-1">
							<h2 className="text-2xl font-bold text-gray-800 mb-3">Round Robin (RR)</h2>
							<p className="text-gray-600 leading-relaxed mb-4">
								Round Robin assigns a fixed time quantum to each process. When a process's time quantum expires, 
								it's preempted and moved to the end of the ready queue. This ensures fair CPU time allocation 
								and prevents starvation.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div className="bg-purple-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Type</div>
									<div className="text-lg font-bold text-purple-600">Preemptive</div>
								</div>
								<div className="bg-indigo-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Time Quantum</div>
									<div className="text-lg font-bold text-indigo-600">Required</div>
								</div>
								<div className="bg-green-50 p-4 rounded-lg">
									<div className="text-sm text-gray-600 mb-1">Starvation</div>
									<div className="text-lg font-bold text-green-600">No</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-xl font-bold text-gray-800">Process Input</h3>
								<div className="flex gap-2">
									<button
										onClick={addProcess}
										className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center gap-2"
									>
										<FaPlus /> Add Process
									</button>
									<button
										onClick={removeProcess}
										disabled={processes.length <= 1}
										className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
									>
										<FaMinus /> Remove
									</button>
								</div>
							</div>
							
							<div className="overflow-x-auto">
								<table className="w-full border-collapse">
									<thead>
										<tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
											<th className="border p-3 text-left">Process ID</th>
											<th className="border p-3 text-left">Arrival Time</th>
											<th className="border p-3 text-left">Burst Time</th>
										</tr>
									</thead>
									<tbody>
										{processes.map((process, index) => (
											<tr key={process.id} className="hover:bg-gray-50">
												<td className="border p-3 font-semibold">P{process.id}</td>
												<td className="border p-3">
													<input
														type="number"
														min="0"
														value={process.arrivalTime}
														onChange={(e) => updateProcess(index, 'arrivalTime', e.target.value)}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
													/>
												</td>
												<td className="border p-3">
													<input
														type="number"
														min="1"
														value={process.burstTime}
														onChange={(e) => updateProcess(index, 'burstTime', e.target.value)}
														className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
													/>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Time Quantum
							</label>
							<input
								type="number"
								min="1"
								value={timeQuantum}
								onChange={(e) => setTimeQuantum(Math.max(1, parseInt(e.target.value) || 1))}
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
							/>
							<p className="text-xs text-gray-500 mt-2">The time slice allocated to each process</p>
						</div>

						<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Context Switch Time
							</label>
							<input
								type="number"
								min="0"
								value={contextSwitch}
								onChange={(e) => setContextSwitch(Math.max(0, parseInt(e.target.value) || 0))}
								className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
							/>
						</div>

						<div className="flex gap-4">
							<button
								onClick={calculate}
								disabled={isCalculating}
								className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
							>
								<FaPlay /> {isCalculating ? "Calculating..." : "Calculate"}
							</button>
							<button
								onClick={reset}
								className="px-6 py-4 bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
							>
								<FaRedo /> Reset
							</button>
						</div>
					</div>

					<div className="space-y-6">
						{output && (
							<>
								<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
									<h3 className="text-lg font-bold text-gray-800 mb-4">Statistics</h3>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600">Avg Completion Time:</span>
											<span className="font-bold text-purple-600">{output.averageTimes[0]?.toFixed(2) || 0}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Avg Turn Around Time:</span>
											<span className="font-bold text-indigo-600">{output.averageTimes[1]?.toFixed(2) || 0}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Avg Waiting Time:</span>
											<span className="font-bold text-pink-600">{output.averageTimes[2]?.toFixed(2) || 0}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Avg Response Time:</span>
											<span className="font-bold text-blue-600">{output.averageTimes[3]?.toFixed(2) || 0}</span>
										</div>
										<div className="flex justify-between pt-2 border-t">
											<span className="text-gray-600">Context Switches:</span>
											<span className="font-bold text-gray-600">{output.contextSwitches}</span>
										</div>
									</div>
								</div>

								<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
									<h3 className="text-lg font-bold text-gray-800 mb-4">Results</h3>
									<div className="overflow-x-auto">
										<table className="w-full border-collapse text-sm">
											<thead>
												<tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
													<th className="border p-2">Process</th>
													<th className="border p-2">CT</th>
													<th className="border p-2">TAT</th>
													<th className="border p-2">WT</th>
													<th className="border p-2">RT</th>
												</tr>
											</thead>
											<tbody>
												{output.completionTime.map((ct, i) => (
													<tr key={i} className="hover:bg-gray-50">
														<td className="border p-2 font-semibold">P{i + 1}</td>
														<td className="border p-2">{ct}</td>
														<td className="border p-2">{output.turnAroundTime[i]}</td>
														<td className="border p-2">{output.waitingTime[i]}</td>
														<td className="border p-2">{output.responseTime[i]}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>

								<div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
									<h3 className="text-lg font-bold text-gray-800 mb-4">Gantt Chart</h3>
									<div className="flex items-center gap-1 flex-wrap">
										{output.schedule.map((item, idx) => (
											<div key={idx} className="flex items-center">
												{item[0] === -2 ? (
													<div className="bg-gray-500 text-white px-2 py-1 text-xs rounded">CS</div>
												) : item[0] === -1 ? (
													<div className="bg-black text-white px-2 py-1 text-xs rounded">IDLE</div>
												) : (
													<div className="bg-purple-500 text-white px-2 py-1 text-xs rounded">
														P{item[0]} ({item[1]})
													</div>
												)}
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoundRobin;
