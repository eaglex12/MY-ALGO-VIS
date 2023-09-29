import React, { useState, useEffect } from 'react';
import './style.css';

const QuickSort = () => {
  const [blocks, setBlocks] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20); // Added array size state



  useEffect(() => {
    generateArray();
  }, [ ]);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const value = Math.ceil(Math.random() * 100);
      newArray.push({ height: value * 3, state: 'none' });
    }
    setBlocks(newArray);
  };

  const hoarePartition = async (l, r) => {
    let newArray = [...blocks];
    const pivot = newArray[l].height;
    let i = l;
    let j = r;
  
    while (i <= j) {
      newArray[i].state = 'yellow'; // Highlight in yellow
      while (newArray[i].height < pivot) {
        i++;
        newArray[i - 1].state = 'none'; // Reset color
        newArray[i].state = 'yellow'; // Highlight in yellow
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
  
      newArray[j].state = 'yellow'; // Highlight in yellow
      while (newArray[j].height > pivot) {
        j--;
        newArray[j + 1].state = 'none'; // Reset color
        newArray[j].state = 'yellow'; // Highlight in yellow
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
  
      if (i <= j) {
        // Swap blocks
        let temp = newArray[i].height;
        newArray[i].height = newArray[j].height;
        newArray[j].height = temp;
        setBlocks([...newArray]);
  
        await new Promise((resolve) => setTimeout(resolve, speed));
        i++;
        j--;
      }
    }
  
    // Reset colors after partitioning
    newArray.forEach((block) => {
      block.state = 'green';
    });
    newArray[i].state = 'red'; // Pivot in red
    setBlocks([...newArray]);
  
    return i;
  };

  const quickSort = async (l, r) => {
    if (l < r) {
      let pivotIndex = await hoarePartition(l, r);
      let newArray = [...blocks];

      await quickSort(l, pivotIndex - 1);
      await quickSort(pivotIndex, r);
    }
  };

  const handleGenerateArray = () => {
    generateArray();
  };

  const handleQuickSort = async () => {
    setSorting(true);
    await quickSort(0, blocks.length - 1);
    setSorting(false);
  };
  const handleArraySizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setArraySize(newSize);
    // generateArray(newSize);
  };

  return (
    <div>
      <div className="header">Quick Sort Visualization</div>
      <div id="array">
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className={`block ${block.state}`}
            style={{
              height: `${block.height}px`,
              transform: `translate(${idx * 30}px)`,
              backgroundColor: block.state === 'yellow' ? 'yellow' : '',
            }}
          >
            <label className="block_id">{block.height / 3}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Speed</label>
        <input
          type="range"
          min="1"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={sorting}
        />
        <span>{speed} ms</span>
      </div>
      <div>
        <label>Array Size:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
          disabled={sorting}
        />
      </div>
      <button onClick={handleGenerateArray} disabled={sorting}>
        Generate Array
      </button>
      <button onClick={handleQuickSort} disabled={sorting}>
        Sort
      </button>
    </div>
  );
};

export default QuickSort;
