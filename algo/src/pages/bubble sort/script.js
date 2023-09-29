import React, { useState,useEffect } from 'react';
import './style.css';

const BubbleSort = () => {
  const [blocks, setBlocks] = useState([]); 
  const [speed, setSpeed] = useState(100);
  const [numElements, setNumElements] = useState(20);
  const [sorting, setSorting] = useState(false);


  useEffect(() => {
    generateArray(); // Generate default array when component mounts
  }, []); 
  
  useEffect(() => {
    generateArray(); // Regenerate array whenever numElements changes
  }, [numElements]);
  
 
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < numElements; i++) {
      const value = Math.ceil(Math.random() * 100);
      newArray.push({ height: value * 3, state: 'none' });
    }
    setBlocks(newArray);
  };

  const swap = (arr, idx1, idx2) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
    return [...arr];
  };
  const bubbleSort = async () => {
    setSorting(true);

    let newArray = [...blocks];
  
    for (let i = 0; i < newArray.length; i++) {
      let currentMaxIndex = 0; // Initialize currentMaxIndex
  
      for (let j = 0; j < newArray.length - i - 1; j++) {
        newArray[j].state = 'active';
        newArray[j + 1].state = 'active';
        setBlocks([...newArray]);
  
        await new Promise((resolve) => setTimeout(resolve, speed)); // Adjusted timing here
        const value1 = newArray[j].height;
        const value2 = newArray[j + 1].height;
  
        if (value1 > value2) {
          let temp = newArray[j].height;
          newArray[j].height = newArray[j + 1].height;
          newArray[j + 1].height = temp;
  
          newArray[j + 1].state = 'none';
          newArray[j].state = 'none';
          setBlocks([...newArray]);
  
          // Update currentMaxIndex when swapping occurs
          currentMaxIndex = j + 1;
        } else {
          newArray[j + 1].state = 'none';
          newArray[j].state = 'none';
          setBlocks([...newArray]);
        }
      }
  
      newArray[newArray.length - i - 1].state = 'done';
      newArray[currentMaxIndex].state = 'max'; // Set the max element to green
      setBlocks([...newArray]);
    }

    setSorting(false);

  };
  
    

  

  return (
    <div>
    <div className="header">Bubble Sort Visualization</div>
    <div id="array">
      {blocks.map((block, idx) => (
        <div
          key={idx}
          className={`block ${block.state}`}
          style={{ height: `${block.height}px`, transform: `translate(${idx * 30}px)` }}
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
        onChange={(e) => 
            setSpeed(e.target.value)

        }
        disabled={sorting}
    
      />
      <span>{speed} ms</span>
    </div>
    <div>
      <label>Number of Elements</label>
      <input
        type="range"
        min="5"
        max="50"
        value={numElements}
        onChange={(e) => setNumElements(e.target.value)}
      />
      <span>{numElements}</span>
    </div>
    <button onClick={generateArray}  disabled={sorting}>Generate Array</button>
    <button onClick={bubbleSort}  disabled={sorting}>Sort</button>
  </div>
  );
};

export default BubbleSort;
