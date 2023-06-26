import swap from "./Swap";

function bubbleSort(
  array: number[],
  arraySize: number,
  animations: number[][]
) {
  let i: number, j: number;
  for (i = 0; i < arraySize - 1; i++) {
    for (j = 0; j < arraySize - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        swap(array, j, j + 1);
        animations.push([j, array[j], j + 1, array[j + 1]]);
        animations.push([j, j + 1]);
      }
    }
  }
}

export const getBubbleSortAnimations = (array: number[], arraySize: number) => {
  const animations: number[][] = [];
  let startingTime = performance.now();
  bubbleSort(array, arraySize, animations);
  let endingTime = performance.now();
  let proccessingTime = endingTime - startingTime;
  const results = {
    animations: animations,
    proccessingTime: proccessingTime,
  };
  return results;
};
