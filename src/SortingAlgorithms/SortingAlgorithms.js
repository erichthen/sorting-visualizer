
export function mergeSort (array) {
    const animations = [];
    if (array.length <= 1) return array; 
    const aux_arr = array.slice();
    merge_helper(array, 0, array.length - 1, aux_arr, animations);
    return animations;
}

function merge_helper(main_arr, start_index, end_index, aux_arr, animations) {
    if (start_index === end_index) return;
    const mid_index = Math.floor((start_index + end_index) / 2);
    merge_helper(aux_arr, start_index, mid_index, main_arr, animations);
    merge_helper(aux_arr, mid_index + 1, end_index, main_arr, animations);
    merge(main_arr, start_index, mid_index, end_index, aux_arr, animations);
}

function merge(main_arr, start_index, mid_index, end_index, aux_arr, animations) {

    let k = start_index;
    let i = start_index;
    let j = mid_index + 1;

    while (i <= mid_index && j <= end_index) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (aux_arr[i] <= aux_arr[j]) {
            animations.push([k, aux_arr[i]]);
            main_arr[k++] = aux_arr[i++];
        }
        else {
            animations.push([k, aux_arr[j]]);
            main_arr[k++] = aux_arr[j++];
        }
    }
    while (i <= mid_index) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, aux_arr[i]])
        main_arr[k++] = aux_arr[i++];
    }
    while (j <= end_index) {
        animations.push([j, j]);
        animations.push([j, j])
        animations.push([k, aux_arr[j]])
        main_arr[k++] = aux_arr[j++];
    }
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
        quick_sort_ip(arr, pt + 1, high);
    }
};

export const quickSort = (arr) => {
    quick_sort_ip(arr, 0, arr.length - 1);
    return arr;
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


//heap sort

export const heapSort = (arr) => {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        max_heap(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        max_heap(arr, i, 0);
    }

    return arr;
};

const max_heap = (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        max_heap(arr, n, largest);
    }
};








 

