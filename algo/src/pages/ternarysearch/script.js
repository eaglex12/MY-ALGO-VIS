import React, { useState, useEffect } from 'react';
import './style.css';

const TernarySearch = () => {
  const [output, setOutput] = useState('');
  const [num, setNum] = useState('');
  const [speed, setSpeed] = useState(700);
  const [numElements, setNumElements] = useState(20);

  const generateArray = () => {
    const container = document.getElementById("array");
    container.innerHTML = ""; 
    var arr = [];

    for (var i = 0; i < numElements; i++) {
      var val = Number(Math.ceil(Math.random() * 100));
      arr.push(val);
    }

    arr.sort(function (a, b) {
      return a - b;
    });

    for (var i = 0; i < numElements; i++) {
      var value = arr[i];
      var array_ele = document.createElement("div");
      array_ele.classList.add("block");
      array_ele.style.height = `${value * 3}px`;
      array_ele.style.transform = `translate(${i * 30}px)`;

      var array_ele_label = document.createElement("label");
      array_ele_label.classList.add("block_id");
      array_ele_label.innerText = value;

      array_ele.appendChild(array_ele_label);
      container.appendChild(array_ele);
    }
  };

  const ternarySearch = async () => {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");

    for (var i = 0; i < blocks.length; i += 1) {
      blocks[i].style.backgroundColor = "#6b5b95";
    }

    output.innerText = "";

    var start = 0;
    var end = numElements - 1;
    var flag = 0;

    while (start <= end) {
      var mid1 = Math.floor(start + (end - start) / 3);
      var mid2 = Math.floor(end - (end - start) / 3);

      var value1 = Number(blocks[mid1].childNodes[0].innerHTML);
      var value2 = Number(blocks[mid2].childNodes[0].innerHTML);

      blocks[mid1].style.backgroundColor = "#FF4949";
      blocks[mid2].style.backgroundColor = "#FF4949";

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      if (value1 == num) {
        output.innerText = "Element Found";
        blocks[mid1].style.backgroundColor = "#13CE66";
        flag = 1;
        break;
      }

      if (value2 == num) {
        output.innerText = "Element Found";
        blocks[mid2].style.backgroundColor = "#13CE66";
        flag = 1;
        break;
      }

      if (num < value1) {
        end = mid1 - 1;
      } else if (num > value2) {
        start = mid2 + 1;
      } else {
        start = mid1 + 1;
        end = mid2 - 1;
      }
    }

    if (flag === 0) {
      output.innerText = "Element Not Found";
    }
  };

  useEffect(() => {
    generateArray();
  }, [numElements]);

  return (
    <div>
      <div className="header">Ternary Search</div>

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
        <button onClick={ternarySearch}>Search</button>
        <br />
        <br />
        <div id="text" style={{ color: 'white' }}>{output}</div>
        <br />
        <button onClick={generateArray}>Generate New Array</button>
      </div>
    </div>
  );
};

export default TernarySearch;
