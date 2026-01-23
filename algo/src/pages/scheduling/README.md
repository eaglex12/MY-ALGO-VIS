# CPU Scheduling Algorithms

This directory contains React components for various CPU scheduling algorithms. Each algorithm is implemented as a separate component with a modern UI.

## Implemented Algorithms

1. **FCFS.js** - First Come First Serve (Non-Preemptive)
2. **SJF.js** - Shortest Job First (Non-Preemptive)
3. **RoundRobin.js** - Round Robin (Preemptive with Time Quantum)

## Algorithms to Implement

The following algorithms can be created by following the pattern of existing components:

### 4. LJF (Longest Job First) - Non-Preemptive
- Copy `SJF.js` and rename to `LJF.js`
- Change algorithm name to `'ljf'`
- In sorting logic, change: `utility.remainingBurstTime[b] - utility.remainingBurstTime[a]` (reverse order)
- Update colors to orange/red theme
- Update description

### 5. SRTF (Shortest Remaining Time First) - Preemptive
- Copy `SJF.js` and rename to `SRTF.js`
- Change algorithm name to `'srtf'`
- Algorithm type will automatically be "preemptive"
- Add preemptive logic: check if a shorter job arrives while current job is running
- Update colors to yellow/green theme
- Update description

### 6. LRTF (Longest Remaining Time First) - Preemptive
- Copy `SRTF.js` and rename to `LRTF.js`
- Change algorithm name to `'lrtf'`
- Reverse the sorting logic (longest first)
- Update colors to red/orange theme
- Update description

### 7. Priority Non-Preemptive
- Copy `FCFS.js` and rename to `PriorityNonPreemptive.js`
- Change algorithm name to `'pnp'`
- Add priority input field to process table
- In sorting logic, use: `priorityPreference * (input.priority[a] - input.priority[b])`
- Add priority preference toggle (high/low)
- Update colors to teal/cyan theme
- Update description

### 8. Priority Preemptive
- Copy `PriorityNonPreemptive.js` and rename to `PriorityPreemptive.js`
- Change algorithm name to `'pp'`
- Algorithm type will automatically be "preemptive"
- Add preemptive logic similar to SRTF
- Update colors to cyan/blue theme
- Update description

### 9. HRRN (Highest Response Ratio Next) - Non-Preemptive
- Copy `FCFS.js` and rename to `HRRN.js`
- Change algorithm name to `'hrrn'`
- In sorting logic, use response ratio formula:
  ```javascript
  function responseRatio(id) {
      let s = utility.remainingBurstTime[id];
      let w = currentTimeLog.time - input.arrivalTime[id] - s;
      return 1 + w / s;
  }
  candidates.sort((a, b) => responseRatio(b) - responseRatio(a));
  ```
- Update colors to pink/purple theme
- Update description

## Common Structure

All scheduling algorithm components follow this structure:

1. **State Management**
   - `processes` - Array of process objects with id, arrivalTime, burstTime
   - `contextSwitch` - Context switch time
   - `timeQuantum` - (For Round Robin only)
   - `output` - Calculation results
   - `isCalculating` - Loading state

2. **Core Functions**
   - `addProcess()` - Add new process
   - `removeProcess()` - Remove last process
   - `updateProcess()` - Update process values
   - `CPUScheduler()` - Main scheduling algorithm logic
   - `calculate()` - Trigger calculation
   - `reset()` - Reset to default state

3. **UI Components**
   - Navigation bar with back button
   - Algorithm info card
   - Process input table
   - Control inputs (context switch, time quantum if needed)
   - Action buttons (Calculate, Reset)
   - Results section (Statistics, Results table, Gantt chart)

## Adding a New Algorithm

1. Create a new file: `AlgorithmName.js`
2. Copy structure from similar existing algorithm
3. Update:
   - Component name
   - Algorithm name in `setAlgorithmNameType()`
   - Sorting/selection logic in `CPUScheduler()`
   - UI colors and theme
   - Algorithm description
   - Route path in `App.js`
   - Export in `index.js`

## Key Differences Between Algorithms

### Non-Preemptive Algorithms (FCFS, SJF, LJF, PNP, HRRN)
- Process runs until completion
- No interruption during execution
- Simpler logic

### Preemptive Algorithms (SRTF, LRTF, PP)
- Process can be interrupted
- Check for better candidate at each time unit
- More complex logic with context switches

### Round Robin
- Uses time quantum
- Preemptive with fixed time slices
- Special handling for time quantum expiration

## Testing

Each component can be tested independently:
- Add/remove processes
- Modify arrival times and burst times
- Set context switch time
- Calculate and verify results
- Check Gantt chart visualization

## Notes

- All algorithms use the same utility classes from `utils.js`
- The `CPUScheduler` function is algorithm-specific
- Gantt charts show process execution timeline
- Statistics include average completion, turnaround, waiting, and response times
