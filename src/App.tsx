import { useEffect, useRef, useState } from "react";
const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ANIMATION_SPEED = 80;
const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

function App() {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [array, setArray] = useState([]);
  const [disableButtons, setDisableButtons] = useState(false);
  const ref = useRef(null);
  const barWidth = arraySize > 50 ? 12 : arraySize > 25 ? 17 : 24;

  //Function to give random values between a specified range
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [arraySize]);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
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
      <div className="bg-[#1b2430] text-[#a66eff] h-screen w-screen p-[20px]">
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
                  console.log(animationSpeed);
                }}
                disabled={disableButtons}
              />
            </div>
          </div>

          <div className="buttons"></div>
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
