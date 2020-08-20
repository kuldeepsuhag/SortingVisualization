import React from "react";
import "./SortingVisualizer.css";
import * as sortingalgorithms from "../SortingAlgorithms/mergeSort";
import * as selectionSort from "../SortingAlgorithms/selectionsort";

const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS =  window.innerWidth/7;
// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }
  selectionSort() {
    const newAnimation = [];
    const newSwap = [];
    const newSwap2 = []
    const animations = selectionSort.selectionSort(this.state.array);
    for (const animation of animations) {
      newAnimation.push(animation.comparison);
      newSwap.push(animation.swap);
      newSwap2.push(animation.swap2)
    }

    const startindex = 0;
var j;
    for (var i = 0; i < (this.state.array.length-1); i++) {
      // console.log("New ANimation", newAnimation[i]);
    const arrayBars = document.getElementsByClassName("array-bar");
      
      for ( j = 0; j <( newAnimation[i].length); j++) {
        // console.log("New ANimation", newAnimation[i][j]);
    
        const [barOneIdx, barTwoIdx] = newAnimation[i][j];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = j % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          
        }, i * ANIMATION_SPEED_MS);
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * (ANIMATION_SPEED_MS) );
    
      
      }

      const [barOneIdx, newHeight] = newSwap[i];
      const [barTwoIdx, newHeight2] = newSwap2[i];
     setTimeout(() => {     
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;    
          barOneStyle.height = `${newHeight}px`;
          barTwoStyle.height = `${newHeight2}px`;
        }, i * ANIMATION_SPEED_MS);
      
    }
  
  }
  mergesort() {
    const animations = sortingalgorithms.getMergeSortAnimations(
      this.state.array
    );

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  heapsort() {}
  bubblesort() {}

  // testSortingAlgo(){
  //     for(let i=0;i< 100;i++){
  //         const array=[];
  //         const length = randomIntFromInterval(1,1000);
  //         for(let i = 0; i< length; i++){
  //             array.push(randomIntFromInterval(-1000,1000))
  //         }
  //         const javascriptsort =array.slice().sort((a,b) => a-b);
  //         const sortedArray = selectionSort.selectionSort(array.slice());
  //         console.log(arraysAreEqual(javascriptsort, sortedArray))
  //     }
  // }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergesort()}>Merge Sort</button>
        <button onClick={() => this.heapsort()}>Heap Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.bubblesort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgo()}>Test Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
