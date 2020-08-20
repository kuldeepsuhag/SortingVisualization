export function selectionSort(array) {
  const animations = [];
  let startIdx = 0;
  while (startIdx < array.length - 1) {

    let level = []
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {

      if (array[smallestIdx] > array[i]) {
        smallestIdx = i;
      }
      level.push([i,smallestIdx])
      level.push([i,smallestIdx])

    }
    
    const auxiliaryArray = array.slice();
    swap(startIdx, animations, array, smallestIdx,level);
   
    startIdx++;
  }
  return animations;
}
function swap(i, animation, array, j, level) {

 
 animation.push({
     comparison: level,
     swap:[i,array[j]],
     swap2:[j, array[i]]
 })
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}
