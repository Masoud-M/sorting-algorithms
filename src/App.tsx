import { useEffect, useRef, useState } from "react";

import { getBubbleSortAnimations } from "./components/BubbleSort";
import { getHeapSortAnimations } from "./components/HeapSort";
import { getInsertionSortAnimations } from "./components/InsertionSort";
import { getQuickSortAnimations } from "./components/QuickSort";
import { getSelectionSortAnimations } from "./components/SelectionSort";

const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ANIMATION_SPEED = 80;
const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

function App() {
  const [arraySize, setArraySize] = useState<number>(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [array, setArray] = useState<number[]>([]);
  const [disableButtons, setDisableButtons] = useState(false);
  const ref = useRef(null);

  const duplicateArray = array.slice();

  const barWidth = arraySize > 50 ? 12 : arraySize > 25 ? 17 : 24;
  const uiBtnStyle =
    "bg-[#8431ff] rounded-[10px] text-white font-semibold transition hover:bg-[#9762e6] px-[21px] py-[11px] text-[14px] inline-block outline-none border-none mr-[0.25em] text-center cursor-pointer shadow-md hover:-translate-y-1";

  //Function to give random values between a specified range
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [arraySize]);

  const resetArray = () => {
    let newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  };

  //Function to do the animations
  const animateSorting = (animations) => {
    setDisableButtons(true);
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i].length === 2;
      // const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * (101 - animationSpeed));
      }
    }

    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const selectionSort = () => {
    const animations = getSelectionSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const heapSort = () => {
    const animations = getHeapSortAnimations(duplicateArray, arraySize);
    animateSorting(animations);
  };

  const insertionSort = () => {
    setDisableButtons(true);

    const animations = getInsertionSortAnimations(duplicateArray, arraySize);
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i].length === 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * (101 - animationSpeed));
      }
    }
    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };

  // let randomArr: number[] = [];
  // for (let i = 0; i < 1000; i++) {
  //   randomArr.push(Math.floor(Math.random() * 1000));
  // }

  // function QuickSort(randomArr: number[]): number[] {
  //   if (randomArr.length <= 0) {
  //     return randomArr;
  //   }
  //   let pivot: number = randomArr[0];
  //   let arrLeft: number[] = [];
  //   let arrRight: number[] = [];

  //   for (let i = 0; i < randomArr.length; i++) {
  //     if (randomArr[i] < pivot) {
  //       arrLeft.push(randomArr[i]);
  //     }
  //     if (randomArr[i] > pivot) {
  //       arrRight.push(randomArr[i]);
  //     }
  //   }
  //   return QuickSort(arrLeft).concat(pivot).concat(QuickSort(arrRight));
  // }

  // const [sorting, setSorting] = useState(randomArr);
  // const handleSorting = () => {
  //   setSorting((prev) => {
  //     return (prev = randomArr ? QuickSort(randomArr) : randomArr);
  //   });
  // };
  return (
    <>
      <div className="bg-[#1b2430] text-[#a66eff] h-screen w-screen p-[20px] overflow-x-hidden">
        <div className="navbar flex flex-col gap-[15px] px-[20px] py-[15px] rounded-[10px] bg-[#252d3a] mb-[10px]">
          <div className="sliderContainer w-full px-[10px] flex flex-row justify-between items-center gap-[10px] ">
            <div className="size ">
              <span className="text-[18px] font-bold text-[#d3d3d3]">
                Size of Array
              </span>
              <input
                type="range"
                id="slider"
                className="slider w-full h-[5px] rounded-sm bg-[#d3d3d3] outline-none opacity-70 transition hover:opacity-100"
                min={10}
                max={100}
                value={arraySize}
                onChange={(e) => {
                  setArraySize(parseInt(e.target.value));
                }}
                disabled={disableButtons}
              />
            </div>
            <div className="speed  ">
              <span className="text-[18px] font-bold text-[#d3d3d3]">
                Sorting Speed
              </span>
              <input
                type="range"
                id="slider"
                className="slider w-full h-[5px] rounded-sm bg-[#d3d3d3] outline-none opacity-70 transition hover:opacity-100"
                min={1}
                max={100}
                value={animationSpeed}
                onChange={(e) => {
                  setAnimationSpeed(parseInt(e.target.value));
                }}
                disabled={disableButtons}
              />
            </div>
          </div>

          <div className="buttons flex flex-col sm:flex-row flex-wrap gap-[10px] items-center justify-center">
            <button
              disabled={disableButtons}
              onClick={resetArray}
              className="bg-[#d3d3d3] rounded-[10px] text-[#491a90] font-semibold transition hover:bg-[#d3d3d3c6] px-[21px] py-[11px] text-[14px] inline-block outline-none border-none mr-[0.25em] text-center cursor-pointer shadow-md hover:-translate-y-1"
            >
              Generate New Array
            </button>
            <button
              disabled={disableButtons}
              onClick={bubbleSort}
              className={uiBtnStyle}
            >
              Bubble Sort
            </button>
            <button
              disabled={disableButtons}
              onClick={selectionSort}
              className={uiBtnStyle}
            >
              Selection Sort
            </button>
            <button
              disabled={disableButtons}
              onClick={quickSort}
              className={uiBtnStyle}
            >
              Quick Sort
            </button>
            <button
              disabled={disableButtons}
              onClick={heapSort}
              className={uiBtnStyle}
            >
              Heap Sort
            </button>
            <button
              disabled={disableButtons}
              onClick={insertionSort}
              className={uiBtnStyle}
            >
              Insertion Sort
            </button>
          </div>
        </div>
        <div
          className="main flex flex-row gap-[2px] items-end justify-center h-[550px] px-[20px] py-[15px] rounded-[10px] bg-[#252d3a] overflow-x-hidden"
          ref={ref}
        >
          {array.map((value, index) => {
            return (
              <div
                className="arrayBar bg-[#a66eff] rounded-[5px]"
                key={index}
                style={{
                  height: `${value}px`,
                  width: `${barWidth}px`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      {/* <div className="w-[90%] h-screen mx-auto flex flex-col items-center justify-center">
        <div className=" flex  items-center justify-center overflow-hidden w-[500px] h-[500px] relative ">
          <div className="absolute top-0 bottom-0 right-0 left-0 ">
            <div className="grid grid-flow-col items-end justify-center absolute  bottom-0 right-0 left-0 ">
              {sorting.map((chart) => {
                return (
                  <div
                    className="w-[0.5px] bg-blue-600 "
                    style={{ height: `${chart / 2}px` }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        <button
          onClick={handleSorting}
          className=" mt-8 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Quick Sorting
        </button>
      </div> */}
    </>
  );
}

export default App;
