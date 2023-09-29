import React, { useState, useEffect } from 'react';
import './style.css'

const BinarySearch = () => {
  const [output, setOutput] = useState('');
  const [num, setNum] = useState('');
  const [speed, setSpeed] = useState(300);
  const [numElements, setNumElements] = useState(20);

  useEffect(() => {
    generateArray();
  }, [numElements]);

  const generateArray = () => {
    const container = document.getElementById("array");
    container.innerHTML = ""; 

    const arr = [];

    for (let i = 0; i < numElements; i++) {
      const val = Math.ceil(Math.random() * 100);
      arr.push(val);
    }

    arr.sort((a, b) => a - b);

    arr.forEach((value, i) => {
      const array_ele = document.createElement("div");
      array_ele.classList.add("block");
      array_ele.style.height = `${value * 3}px`;
      array_ele.style.transform = `translate(${i * 30}px)`;

      const array_ele_label = document.createElement("label");
      array_ele_label.classList.add("block_id");
      array_ele_label.innerText = value;

      array_ele.appendChild(array_ele_label);
      container.appendChild(array_ele);
    });
  };

  const binarySearch = async () => {
    const blocks = document.querySelectorAll(".block");
    const output = document.getElementById("text");
    const target = parseInt(num);

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.backgroundColor = "#6b5b95";
    }

    output.innerText = "";

    let start = 0;
    let end = blocks.length - 1;
    let flag = false;

    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      blocks[mid].style.backgroundColor = "#FF4949";
      const value = parseInt(blocks[mid].childNodes[0].innerHTML);

      await new Promise(resolve => setTimeout(resolve, speed));

      if (value === target) {
        output.innerText = "Element Found";
        blocks[mid].style.backgroundColor = "#13CE66";
        flag = true;
        break;
      }

      if (value < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }

      blocks[mid].style.backgroundColor = "#6b5b95";
    }

    if (!flag) {
      output.innerText = "Element Not Found";
    }
  };

  return (
    <div>
      <div className="header">Binary Search</div>

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

      <div id="array"></div>

      <div style={{ textAlign: "center" }}>
        <label htmlFor="fname">Number to be Searched:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <br />
        <br />
        <button onClick={binarySearch}>Search</button>
        <br />
        <br />
        <div id="text" style={{ color: 'white' }}>{output}</div>
        <br />
        <button onClick={generateArray}>Generate New Array</button>
      </div>
    </div>
  );
};

export default BinarySearch;
