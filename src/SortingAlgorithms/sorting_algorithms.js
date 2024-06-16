
//mergeSort

export const mergeSort = array => {

    if (array.length <= 1){
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
    
}

const merge = (left, right) => {

    let result = [];
    let left_index = 0;
    let right_index = 0;

    while (left_index < left.length && right_index < right.length) {
        if (left[left_index] < right[right_index]) {
            result.push(left[left_index]);
            left_index ++;
        }
        else {
            result.push(right[right_index]);
            right_index ++;
        }
    }
    return result.concat(left.slice(left_index)).concat(right.slice(right_index)); 
}



//quick sort

const partition = (arr, low, high) => {

    let pivot = arr [high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
};

const quick_sort_ip = (arr, low, high) => {

    if (low < high) {
        let pt = partition(arr, low, high);
        quick_sort_ip(arr, low, pt - 1);
        quick_sort_ip(arr, pt + 1);
    }
};

export const quickSort = (arr) => {
    quick_sort_ip(arr, 0, arr.length - 1);
};


//bubble_sort

export const bubbleSort = (arr) => {

    let n = arr.length;
    let swapped;

    for(let i = 0; i < n - 1; i ++) {

        swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        if (!swapped){
            break;
        }

    }
    return arr;

};









 

