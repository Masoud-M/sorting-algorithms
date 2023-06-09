import { useState } from "react";

function App() {
  let randomArr: number[] = [];
  for (let i = 0; i < 1000; i++) {
    randomArr.push(Math.floor(Math.random() * 1000));
  }

  function QuickSort(randomArr: number[]): number[] {
    if (randomArr.length <= 0) {
      return randomArr;
    }
    let pivot: number = randomArr[0];
    let arrLeft: number[] = [];
    let arrRight: number[] = [];

    for (let i = 0; i < randomArr.length; i++) {
      if (randomArr[i] < pivot) {
        arrLeft.push(randomArr[i]);
      }
      if (randomArr[i] > pivot) {
        arrRight.push(randomArr[i]);
      }
    }
    return QuickSort(arrLeft).concat(pivot).concat(QuickSort(arrRight));
  }

  const [sorting, setSorting] = useState(randomArr);
  const handleSorting = () => {
    setSorting((prev) => {
      return (prev = randomArr ? QuickSort(randomArr) : randomArr);
    });
  };
  return (
    <>
      <div className="w-[90%] h-screen mx-auto flex flex-col items-center justify-center">
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
      </div>
    </>
  );
}

export default App;
