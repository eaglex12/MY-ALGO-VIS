import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import LinearSearch from './pages/linearsearch/script';
import BinarySearch from './pages/binarysearch/script';
import TernarySearch from './pages/ternarysearch/script';
import BubbleSort from './pages/bubble sort/script';
import QuickSort from './pages/Quick sort/script';
import InsertionSort from './pages/insertion sort/script';
import ParticleBackground from './components/ParticleBackground';
function App() {
  return (
    <Router>
      <div>
      <ParticleBackground/>

        <div className="search-container">

          <Routes>
          <Route path="/" element={<HomePage />} />

            <Route path="/linear-search" element={<LinearSearch />} />
            <Route path="/binary-search" element={<BinarySearch />} />
            <Route path="/ternary-search" element={<TernarySearch />} />
            <Route path="/bubble-sort" element={<BubbleSort />} /> {/* Add this line */}
            <Route path="/quick-sort" element={<QuickSort />} /> {/* Add this line */}
            <Route path="/insert-sort" element={<InsertionSort/>} />


          </Routes>

        </div>

        
      </div>
    </Router>
  );
}

export default App;
