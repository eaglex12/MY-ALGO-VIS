import React ,{useEffect} from 'react'; // Add useEffect
import { Link } from 'react-router-dom';
import LiveClock from 'react-live-clock'; // Import the LiveClock component
import './HomePage.css';
import Footer from '../footer/footer';// Import the Footer component


const AlgorithmBox = ({ to, imgSrc, alt, heading, description }) => (
  <Link to={to} className="algorithm-box">
    <img src={imgSrc} alt={alt} />
    <h3>{heading}</h3>
    <hr />
    <p>{description}</p>
  </Link>
);

const HomePage = () => {
  useEffect(() => {
    const scrollToElement = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    document.querySelectorAll('.social-links a').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('href').substring(1);
        scrollToElement(id);
      });
    });
  }, []);
  
  
  
  return (
    <div>



      <nav className="navbar">
        <h1>Searching Visualizer</h1>
        <div className="navbar-clock">
          <LiveClock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> {/* Add the LiveClock component */}
        </div>
        
        <div className="navbar-links">
          <Link to="/linear-search">Linear Search</Link>
          <Link to="/binary-search">Binary Search</Link>
          <Link to="/ternary-search">Ternary Search</Link>
        </div>
      </nav>

      <div className="home-container">
        <div className="algorithm-row">
          <AlgorithmBox
            to="/linear-search"
            imgSrc="ls.png"
            alt="Linear Search"
            heading="Linear Search"
            description="Linear search is a basic searching algorithm that sequentially checks each element in a list until the desired element is found or the end of the list is reached."
          />
          <AlgorithmBox
            to="/binary-search"
            imgSrc="bs.png"
            alt="Binary Search"
            heading="Binary Search"
            description="Binary search is a fast searching algorithm that works by repeatedly dividing the search space in half."
          />
          <AlgorithmBox
            to="/ternary-search"
            imgSrc="ts.jpg"
            alt="Ternary Search"
            heading="Ternary Search"
            description="Ternary search is an improved version of binary search. It divides the array into three parts and determines which part the search element is in."
          />
        </div>
        <div className="algorithm-row">
        <AlgorithmBox
            to="/bubble-sort"
            imgSrc="bubble.png"
            alt="Bubble Sort"
            heading="Bubble Sort"
            description="Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order."
          />
          <AlgorithmBox
            to="/quick-sort"
            imgSrc="qs.webp"
            alt="Quick Sort"
            heading="Quick Sort"
            description="Quick sort is an efficient, comparison-based sorting algorithm. It divides the input array into smaller sub-arrays, then recursively sorts them."
          />
          <AlgorithmBox
            to="/insert-sort"
            imgSrc="is.jpg"
            alt="Insertion Sort"
            heading="Insertion Sort"
            description="Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time."
          />
      
        </div>
        <div className="algorithm-row">

        <a href={process.env.PUBLIC_URL + '/Scheduling/algo.html'} className="algorithm-box" target="_blank" rel="noopener noreferrer">
          <img src="sched.jpg" alt="Scheduler" />
          <h3>Scheduler</h3>
          <hr />
          <p>Description of the scheduling algorithm.</p>
        </a>
      </div>
      </div>
      <Footer /> {/* Add the Footer component */}

    </div>
  );
};

export default HomePage;
