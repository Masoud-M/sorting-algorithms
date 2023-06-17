export default function swap(arr: number[], xp: number, yp: number) {
  let temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
}
