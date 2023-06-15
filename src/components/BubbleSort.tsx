import swap from "./Swap";

function bubbleSort(array, arraySize, animations) {
  let i, j;
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

export const getBubbleSortAnimations = (array, arraySize) => {
  const animations = [];
  bubbleSort(array, arraySize, animations);
  console.log(animations);
  return animations;
};
