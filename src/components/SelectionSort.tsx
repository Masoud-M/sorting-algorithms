import swap from "./Swap";

export const getSelectionSortAnimations = (
  array: number[],
  arraySize: number
) => {
  const animations: number[][] = [];
  selectionSort(array, arraySize, animations);
  return animations;
};

function selectionSort(
  arr: number[],
  arraySize: number,
  animations: number[][]
) {
  let i, j, minIdx;
  for (i = 0; i < arraySize - 1; i++) {
    minIdx = i;
    for (j = i + 1; j < arraySize; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    //Pushing the indices into animation to change the color
    animations.push([i, minIdx]);
    swap(arr, minIdx, i);
    animations.push([minIdx, arr[minIdx], i, arr[i]]);
    //Againg pushing the indices to revert backto original color
    animations.push([i, minIdx]);
  }
}
