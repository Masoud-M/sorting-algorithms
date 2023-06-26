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
    " rounded-[10px] text-white font-semibold transition  px-[21px] py-[11px] text-[14px] inline-block outline-none border-none mr-[0.25em] text-center shadow-md ";

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

  const handleStop = () => {
    isStopped.current = true;
  };

  const handleReset = () => {
    window.location.reload();
  };
  let isStopped = useRef(false);
  let canContinue = useRef(false);

  const checkStop = () => {
    if (!isStopped.current) {
      canContinue.current = true;
    } else if (isStopped.current) {
      canContinue.current = false;
    }
  };

  //Function to do the animations
  const animateSorting = (animations: number[][]) => {
    setDisableButtons(true);
    const arrayBars = document.getElementsByClassName(
      "arrayBar"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          checkStop();
          if (canContinue.current) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          } else return;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          checkStop();
          if (canContinue.current) {
            const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
              animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeightOne}px`;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barTwoStyle.height = `${newHeightTwo}px`;
          } else return;
        }, i * (101 - animationSpeed));
      }
    }

    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };

  const [proccessingTimeState, setProccessingTimeState] = useState(0);

  const bubbleSort = () => {
    setProccessingTimeState(0);
    const results = getBubbleSortAnimations(duplicateArray, arraySize);
    const animations = results.animations;
    setProccessingTimeState(results.proccessingTime);
    animateSorting(animations);
  };

  const selectionSort = () => {
    setProccessingTimeState(0);
    const results = getSelectionSortAnimations(duplicateArray, arraySize);
    const animations = results.animations;
    setProccessingTimeState(results.proccessingTime);
    animateSorting(animations);
  };

  const quickSort = () => {
    setProccessingTimeState(0);
    const results = getQuickSortAnimations(duplicateArray, arraySize);
    const animations = results.animations;
    setProccessingTimeState(results.proccessingTime);
    animateSorting(animations);
  };

  const heapSort = () => {
    setProccessingTimeState(0);
    const results = getHeapSortAnimations(duplicateArray, arraySize);
    const animations = results.animations;
    setProccessingTimeState(results.proccessingTime);
    animateSorting(animations);
  };

  const insertionSort = () => {
    setProccessingTimeState(0);
    setDisableButtons(true);
    // ref.current?.scrollIntoView({ behavior: "smooth" });
    const results = getInsertionSortAnimations(duplicateArray, arraySize);
    const animations = results.animations;
    setProccessingTimeState(results.proccessingTime);
    const arrayBars = document.getElementsByClassName(
      "arrayBar"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "turquoise" : "#a66cff";
        setTimeout(() => {
          checkStop();
          if (canContinue.current) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          } else return;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          checkStop();
          if (canContinue.current) {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;
            barStyle.height = `${newHeight}px`;
          } else return;
        }, i * (101 - animationSpeed));
      }
    }
    setTimeout(() => {
      setDisableButtons(false);
    }, animations.length * (101 - animationSpeed));
  };

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
            <div className="flex flex-col sm:flex-row flex-wrap gap-[10px] items-center justify-center">
              <button
                disabled={disableButtons}
                onClick={resetArray}
                className={
                  disableButtons
                    ? `bg-[#d3d3d3c6] rounded-[10px] text-[#491a90] font-semibold transition  px-[21px] py-[11px] text-[14px] inline-block outline-none border-none mr-[0.25em] text-center  shadow-md `
                    : `bg-[#d3d3d3] rounded-[10px] text-[#491a90] font-semibold transition hover:bg-[#d3d3d3c6] px-[21px] py-[11px] text-[14px] inline-block outline-none border-none mr-[0.25em] text-center cursor-pointer shadow-md hover:-translate-y-1`
                }
              >
                Generate New Array
              </button>
              <button
                disabled={!disableButtons}
                onClick={handleStop}
                className={
                  !disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#f84027] hover:-translate-y-1 cursor-pointer ${uiBtnStyle}`
                }
              >
                STOP
              </button>
              <button
                onClick={handleReset}
                className={` bg-[#f84027] hover:-translate-y-1 cursor-pointer ${uiBtnStyle}`}
              >
                Reset
              </button>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-[10px] items-center justify-center ">
              <button
                disabled={disableButtons}
                onClick={bubbleSort}
                className={
                  disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#8431ff] hover:-translate-y-1 hover:bg-[#9762e6] cursor-pointer ${uiBtnStyle}`
                }
              >
                Bubble Sort
              </button>
              <button
                disabled={disableButtons}
                onClick={selectionSort}
                className={
                  disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#8431ff] hover:-translate-y-1 hover:bg-[#9762e6] cursor-pointer ${uiBtnStyle}`
                }
              >
                Selection Sort
              </button>
              <button
                disabled={disableButtons}
                onClick={quickSort}
                className={
                  disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#8431ff] hover:-translate-y-1 hover:bg-[#9762e6] cursor-pointer ${uiBtnStyle}`
                }
              >
                Quick Sort
              </button>
              <button
                disabled={disableButtons}
                onClick={heapSort}
                className={
                  disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#8431ff] hover:-translate-y-1 hover:bg-[#9762e6] cursor-pointer ${uiBtnStyle}`
                }
              >
                Heap Sort
              </button>
              <button
                disabled={disableButtons}
                onClick={insertionSort}
                className={
                  disableButtons
                    ? ` bg-[#d3d3d3c6] ${uiBtnStyle}`
                    : ` bg-[#8431ff] hover:-translate-y-1 hover:bg-[#9762e6] cursor-pointer ${uiBtnStyle}`
                }
              >
                Insertion Sort
              </button>
            </div>
            <div className="flex h-full justify-center items-center  text-center text-[18px] font-bold text-[#d3d3d3]">
              Real proccessing time in : {proccessingTimeState} ms
            </div>
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
    </>
  );
}

export default App;
