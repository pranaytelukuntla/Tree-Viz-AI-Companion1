function parent(index) {
    if (index === 0) {
      return -1;
    }
    return Math.floor((index - 1) / 2);
  }
  
  function leftChild(index) {
    return 2 * index + 1;
  }
  
  function rightChild(index) {
    return 2 * index + 2;
  }

  function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }



function makeHeap(arr){
    for(let i=1; i<arr.length;++i){
        let k = i;
        while(k>0 && arr[parent(k)]<arr[k]){
            swap(arr,k,parent(k));
            k = parent(k);
        }
        
    }
    return arr;
}