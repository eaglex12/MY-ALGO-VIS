// CPU Scheduling Algorithms - Export all components
export { default as FCFS } from './FCFS';
export { default as SJF } from './SJF';
export { default as LJF } from './LJF';
export { default as SRTF } from './SRTF';
export { default as LRTF } from './LRTF';
export { default as HRRN } from './HRRN';
export { default as PriorityNonPreemptive } from './PriorityNonPreemptive';
export { default as PriorityPreemptive } from './PriorityPreemptive';
export { default as RoundRobin } from './RoundRobin';

// Note: Additional algorithms can be created following the same pattern:
// - LJF (Longest Job First) - Similar to SJF but sort by longest burst time
// - SRTF (Shortest Remaining Time First) - Preemptive version of SJF
// - LRTF (Longest Remaining Time First) - Preemptive version of LJF
// - PriorityNonPreemptive - Similar to FCFS but sort by priority
// - PriorityPreemptive - Preemptive version with priority
// - HRRN (Highest Response Ratio Next) - Uses response ratio formula

// To create a new algorithm:
// 1. Copy one of the existing files (FCFS.js, SJF.js, or RoundRobin.js)
// 2. Update the algorithm name in setAlgorithmNameType(input, 'algorithm_name')
// 3. Modify the sorting logic in CPUScheduler function
// 4. Update the UI colors and descriptions
// 5. Export it from this index file
