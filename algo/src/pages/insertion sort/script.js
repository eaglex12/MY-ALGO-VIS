import React, { useState, useEffect } from 'react';
import './style.css';

const InsertionSort = () => {
  const [bars, setBars] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [numElements, setNumElements] = useState(20);
  const [sorting, setSorting] = useState(false);
  const [movedBackIndex, setMovedBackIndex] = useState(null);
  const [currentKeyHeight, setCurrentKeyHeight] = useState(0);

  useEffect(() => {
    generateArray();
  }, [numElements]);

  const generateArray = () => {
    const newBars = [];
    for (let i = 0; i < numElements; i++) {
      const value = Math.ceil(Math.random() * 100);
      newBars.push({ height: value * 3, id: i, state: 'unsorted' });
    }
    setBars(newBars);
  };

  const insertionSort = async () => {
    setSorting(true);

    let newBars = [...bars];
    let i = 1;

    while (i < newBars.length) {
      let key = newBars[i];
      let j = i - 1;

      while (j >= 0 && newBars[j].height > key.height) {
        console.log(`Current key height: ${key.height / 3}`);
        setCurrentKeyHeight(key.height);

        newBars[j + 1] = newBars[j];
        j = j - 1;
        newBars[j + 1].transform = `translateY(${400 - newBars[j + 1].height}px)`;
        setMovedBackIndex(j + 1);
        newBars[j + 1].state = 'active';

        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      newBars[j + 1] = key;
      newBars[j + 1].transform = `translateY(${400 - key.height}px)`;

      await new Promise((resolve) => setTimeout(resolve, speed));
      setBars([...newBars]);
      i++;
    }

    newBars = newBars.map((bar) => ({
      ...bar,
      transform: `translateY(${400 - bar.height}px)`,
      state: 'unsorted',
    }));

    setBars(newBars);
    setMovedBackIndex(null);
    setSorting(false);
  };

  const handleInsertionSort = async () => {
    await insertionSort();
  };

  const handleSliderChange = (event) => {
    setNumElements(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const generate = () => {
    generateArray();
  };

  return (
    <div>
      <div className="sliders">
        <label htmlFor="sizeSlider">Array Size:</label>
        <input
          type="range"
          id="sizeSlider"
          min="5"
          max="100"
          step="1"
          value={numElements}
          onChange={handleSliderChange}
          disabled={sorting}
        />
        <span>{numElements}</span>
        <br></br>
        <label htmlFor="speedSlider">Sorting Speed:</label>
        <input
          type="range"
          id="speedSlider"
          min="1"
          max="500"
          step="1"
          value={speed}
          onChange={handleSpeedChange}
          disabled={sorting}
        />
        <span>{speed} ms</span>
      </div>
      <button onClick={generate} disabled={sorting}>
        Generate New Array
      </button>
      <button onClick={handleInsertionSort} disabled={sorting}>
        Insertion Sort
      </button>
      <div className="data-container">
        {bars.map((bar, index) => (
          <div
            key={bar.id}
            className={`bar ${bar.state} ${index === movedBackIndex ? 'moved-back' : ''}`}
            style={{
              height: `${bar.height}px`,
              transform: `translateY(${400 - bar.height}px)`,
            }}
          >
            <label className="bar__id">{bar.height / 3}</label>
          </div>
        ))}
      </div>
      {currentKeyHeight !== null && (
        <div className="current-key-height">
          Current Key Height: {currentKeyHeight / 3}
        </div>
      )}
    </div>
  );
};

export default InsertionSort;
