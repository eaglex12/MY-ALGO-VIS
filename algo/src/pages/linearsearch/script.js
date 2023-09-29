import React, { useState, useEffect } from 'react';
import './style.css';

const LinearSearch = () => {
  const [output, setOutput] = useState('');
  const [num, setNum] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [numElements, setNumElements] = useState(20);

  useEffect(() => {
    generateArray();
  }, [numElements]);

  const generateArray = () => {
    const newBlocks = [];
    for (let i = 0; i < numElements; i++) {
      const value = Math.ceil(Math.random() * 100);
      newBlocks.push({
        value,
        style: {
          height: `${value * 3}px`,
          transform: `translate(${i * 30}px)`,
        },
      });
    }
    setBlocks(newBlocks);
  };

  const linearSearch = async () => {
    setOutput('');

    for (let i = 0; i < blocks.length; i += 1) {
      const updatedBlocks = [...blocks];
      updatedBlocks[i] = {
        ...updatedBlocks[i],
        style: {
          ...updatedBlocks[i].style,
          backgroundColor: '#FF4949',
        },
      };
      setBlocks(updatedBlocks);

      await new Promise((resolve) => setTimeout(resolve, speed));

      const value = updatedBlocks[i].value;
      if (value == num) {
        setOutput('Element Found');
        updatedBlocks[i] = {
          ...updatedBlocks[i],
          style: {
            ...updatedBlocks[i].style,
            backgroundColor: '#13CE66',
          },
        };
        setBlocks(updatedBlocks);
        return;
      }

      updatedBlocks[i] = {
        ...updatedBlocks[i],
        style: {
          ...updatedBlocks[i].style,
          backgroundColor: '#6b5b95',
        },
      };

      setBlocks(updatedBlocks);
    }

    setOutput('Element Not Found');
  };

  const handleGenerateArray = () => {
    generateArray();
    setOutput('');
    setNum('');
  };

  return (
    <div>
      <div>
        <button onClick={handleGenerateArray}>Generate New Array</button>
      </div>
      <div>
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span>{speed} ms</span>
      </div>
      <div>
        <label>Number of Elements:</label>
        <input
          type="range"
          min="5"
          max="50"
          value={numElements}
          onChange={(e) => setNumElements(Number(e.target.value))}
        />
        <span>{numElements}</span>
      </div>
      <div id="array">
        {blocks.map((block, index) => (
          <div key={index} className="block" style={block.style}>
            <label className="block_id">{block.value}</label>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="fname">Number to be Searched:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <br />
        <button onClick={linearSearch}>Search</button>
      </div>

      <div id="text" style={{ color: 'white' }}>{output}</div>
    </div>
  );
};

export default LinearSearch;
