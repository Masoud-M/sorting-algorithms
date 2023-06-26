export const getInsertionSortAnimations = (
  array: number[],
  arraySize: number
) => {
  const animations: number[][] = [];
  let startingTime = performance.now();
  insertionSort(array, arraySize, animations);
  let endingTime = performance.now();
  let proccessingTime = endingTime - startingTime;
  const results = {
    animations: animations,
    proccessingTime: proccessingTime,
  };
  return results;
};

const insertionSort = (
  array: number[],
  arraySize: number,
  animations: number[][]
) => {
  let i, key, j;
  for (i = 1; i < arraySize; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1]);
      array[j + 1] = array[j];
      animations.push([j + 1, array[j + 1]]);
      animations.push([j, j + 1]);
      j = j - 1;
    }
    animations.push([j + 1, j + 1]);
    array[j + 1] = key;
    animations.push([j + 1, array[j + 1]]);
    animations.push([j + 1, j + 1]);
  }
};
