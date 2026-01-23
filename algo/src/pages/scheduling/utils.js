// Shared utility classes and functions for CPU Scheduling algorithms

export class Input {
    constructor() {
        this.processId = [];
        this.priority = [];
        this.arrivalTime = [];
        this.processTime = [];
        this.processTimeLength = [];
        this.totalBurstTime = [];
        this.algorithm = "";
        this.algorithmType = "";
        this.timeQuantum = 0;
        this.contextSwitch = 0;
    }
}

export class Utility {
    constructor() {
        this.remainingProcessTime = [];
        this.remainingBurstTime = [];
        this.remainingTimeRunning = [];
        this.currentProcessIndex = [];
        this.start = [];
        this.done = [];
        this.returnTime = [];
        this.currentTime = 0;
    }
}

export class Output {
    constructor() {
        this.completionTime = [];
        this.turnAroundTime = [];
        this.waitingTime = [];
        this.responseTime = [];
        this.schedule = [];
        this.timeLog = [];
        this.contextSwitches = 0;
        this.averageTimes = []; //ct,tat,wt,rt
    }
}

export class TimeLog {
    constructor() {
        this.time = -1;
        this.remain = [];
        this.ready = [];
        this.running = [];
        this.block = [];
        this.terminate = [];
        this.move = []; //0-remain->ready 1-ready->running 2-running->terminate 3-running->ready 4-running->block 5-block->ready
    }
}

export function setAlgorithmNameType(input, algorithm) {
    input.algorithm = algorithm;
    switch (algorithm) {
        case 'fcfs':
        case 'sjf':
        case 'ljf':
        case 'pnp':
        case 'hrrn':
            input.algorithmType = "nonpreemptive";
            break;
        case 'srtf':
        case 'lrtf':
        case 'pp':
            input.algorithmType = "preemptive";
            break;
        case 'rr':
            input.algorithmType = "roundrobin";
            break;
    }
}

export function setInput(input, processes) {
    for (let i = 0; i < processes.length; i++) {
        input.processId.push(i);
        input.priority.push(processes[i].priority);
        input.arrivalTime.push(processes[i].arrivalTime);
        let pta = [];
        processes[i].burstTimes.forEach(bt => pta.push(bt));
        input.processTime.push(pta);
        input.processTimeLength.push(pta.length);
    }
    
    // Calculate total burst time for each process
    input.totalBurstTime = new Array(processes.length).fill(0);
    input.processTime.forEach((e1, i) => {
        e1.forEach((e2, j) => {
            if (j % 2 == 0) {
                input.totalBurstTime[i] += e2;
            }
        });
    });
}

export function setUtility(input, utility) {
    utility.remainingProcessTime = input.processTime.map(arr => [...arr]);
    utility.remainingBurstTime = [...input.totalBurstTime];
    utility.remainingTimeRunning = new Array(input.processId.length).fill(0);
    utility.currentProcessIndex = new Array(input.processId.length).fill(0);
    utility.start = new Array(input.processId.length).fill(false);
    utility.done = new Array(input.processId.length).fill(false);
    utility.returnTime = [...input.arrivalTime];
}

export function reduceSchedule(schedule) {
    if (schedule.length === 0) return [];
    let newSchedule = [];
    let currentScheduleElement = schedule[0][0];
    let currentScheduleLength = schedule[0][1];
    for (let i = 1; i < schedule.length; i++) {
        if (schedule[i][0] == currentScheduleElement) {
            currentScheduleLength += schedule[i][1];
        } else {
            newSchedule.push([currentScheduleElement, currentScheduleLength]);
            currentScheduleElement = schedule[i][0];
            currentScheduleLength = schedule[i][1];
        }
    }
    newSchedule.push([currentScheduleElement, currentScheduleLength]);
    return newSchedule;
}

export function outputAverageTimes(output, processCount) {
    let avgct = output.completionTime.reduce((a, b) => a + b, 0) / processCount;
    let avgtat = output.turnAroundTime.reduce((a, b) => a + b, 0) / processCount;
    let avgwt = output.waitingTime.reduce((a, b) => a + b, 0) / processCount;
    let avgrt = output.responseTime.reduce((a, b) => a + b, 0) / processCount;
    return [avgct, avgtat, avgwt, avgrt];
}

export function setOutput(input, output) {
    // Set turn around time and waiting time
    for (let i = 0; i < input.processId.length; i++) {
        output.turnAroundTime[i] = output.completionTime[i] - input.arrivalTime[i];
        output.waitingTime[i] = output.turnAroundTime[i] - input.totalBurstTime[i];
    }
    output.schedule = reduceSchedule(output.schedule);
    output.averageTimes = outputAverageTimes(output, input.processId.length);
}

export function moveElement(value, from, to) {
    let index = from.indexOf(value);
    if (index != -1) {
        from.splice(index, 1);
    }
    if (to.indexOf(value) == -1) {
        to.push(value);
    }
}
