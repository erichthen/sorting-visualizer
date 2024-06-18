
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

export function quickSort(array) {
    const animations =[];
    if (array.length <= 1) return array;
    quick_sort_ip(array, 0, array.length - 1, animations);
    return animations;
};


const partition = (arr, low, high, animations) => {

    let pivot = arr [high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        animations.push(['compare', j, high]);
        animations.push(['compare', j, high]);
        if (arr[j] <= pivot) {
            i++;
            animations.push(['swap', i, arr[j], j, arr[i]]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    //final swap for pivot -> correct place
    animations.push(['swap', i + 1, arr[high], high, arr[i + 1]]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
};

const quick_sort_ip = (arr, low, high, animations) => {

    if (low < high) {
        let pt = partition(arr, low, high, animations);
        quick_sort_ip(arr, low, pt - 1, animations);
        quick_sort_ip(arr, pt + 1, high, animations);
    }
};


//bubble_sort

export const bubbleSort = (arr) => {

    const animations = [];
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            animations.push(['compare', j, j + 1]);
            animations.push(['compare', j, j + 1]);
            if (arr[j] > arr[j + 1]) {
                animations.push(['swap', j, arr[j + 1], j + 1, arr[j]]);

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    console.log(animations);
    return animations;
};


export const heapSort = (arr) => {
    const animations = [];
    let n = arr.length;


    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, animations);
    }

    //extracting
    for (let i = n - 1; i > 0; i--) {
        animations.push(['swap', 0, arr[i], i, arr[0]]);
        [arr[0], arr[i]] = [arr[i], arr[0]];

        heapify(arr, i, 0, animations);
    }

    return animations;
};

const heapify = (arr, n, i, animations) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        animations.push(['compare', left, largest]);
        animations.push(['compare', left, largest]);
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        animations.push(['compare', right, largest]);
        animations.push(['compare', right, largest]);
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== i) {
        animations.push(['swap', i, arr[largest], largest, arr[i]]);
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest, animations);
    }
};






 

