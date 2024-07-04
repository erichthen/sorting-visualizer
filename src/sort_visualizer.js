//TODOS

//window scaling
//coloring
//speed scaling
//ADD BOGO SORT MF 

let array = [];
let arraySize = document.getElementById('arraySize').value;  
let sortSpeed = document.getElementById('sortSpeed').value;;
const chartContainer = document.getElementById('chart-container');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//assign slider values on load and refresh
document.addEventListener('DOMContentLoaded', function () {
    generateArray();
});

document.addEventListener('DOMContentLoaded', function () {
    updateSortSpeed();
});


function generateArray() {
    //assign size amount random numbers to iterable of length size, convert to array, update bars  
    array = Array.from({length: arraySize}, () => Math.floor(Math.random() * 100) + 1);
    updateChart();
}

function updateChart() {
    chartContainer.innerHTML = '';
    const barWidth = chartContainer.clientWidth / array.length;
    const maxHeight = chartContainer.clientHeight - 10;
    const scaleFactor = maxHeight / Math.max(...array);

    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * scaleFactor}px`;
        bar.style.width = `${barWidth - 1}px`;
        bar.style.left = `${index * barWidth}px`;
        chartContainer.appendChild(bar);
    });
}

function sleep(ms) {
    console.log(`sleeping for: ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playSound() {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); 
}

async function runSort(algorithm) {
    switch(algorithm) {

        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort(0, array.length - 1);
            break;
        case 'quick':
            await quickSort(0, array.length - 1);
            break;
        case 'heap':
            await heapSort();
            break;
    }
    finalizeSort();
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            setBarColor(j, 'red');
            setBarColor(j + 1, 'red');
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                updateChart();
                await sleep(1001 - sortSpeed);
            }
            setBarColor(j, '#4a90e2');
            setBarColor(j + 1, '#4a90e2');
        }
        setBarColor(array.length - i - 1, 'green');
        playSound();
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        setBarColor(i, 'red');

        for (let j = i + 1; j < array.length; j++) {
            setBarColor(j, 'red');
            if (array[j] < array[minIndex]) {
                setBarColor(minIndex, '#4a90e2');
                minIndex = j;
            }
            await sleep(1001 - sortSpeed);
            setBarColor(j, '#4a90e2');
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            updateChart();
        }
        setBarColor(i, 'green');
        playSound();
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        setBarColor(i, 'red');

        while (j >= 0 && array[j] > key) {
            setBarColor(j, 'red');
            array[j + 1] = array[j];
            updateChart();
            await sleep(1001 - sortSpeed);
            setBarColor(j, '#4a90e2');
            j--;
        }
        array[j + 1] = key;
        updateChart();
        setBarColor(j + 1, 'green');
        playSound();
    }
}

async function merge(left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = array[left + i];
    for (let j = 0; j < n2; j++) R[j] = array[mid + 1 + j];
    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        setBarColor(k, 'red');
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        updateChart();
        await sleep(1001 - sortSpeed);
        setBarColor(k, 'green');
        playSound();
        k++;
    }
    while (i < n1) {
        setBarColor(k, 'red');
        array[k] = L[i];
        updateChart();
        await sleep(1001 - sortSpeed);
        setBarColor(k, 'green');
        playSound();
        i++;
        k++;
    }
    while (j < n2) {
        setBarColor(k, 'red');
        array[k] = R[j];
        updateChart();
        await sleep(1001 - sortSpeed);
        setBarColor(k, 'green');
        playSound();
        j++;
        k++;
    }
}

async function mergeSort(left, right) {
    if (left < right) {
        let mid = left + Math.floor((right - left) / 2);
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
        await merge(left, mid, right);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    setBarColor(high, 'red');
    let i = low - 1;

    for (let j = low; j < high; j++) {
        setBarColor(j, 'red');
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            updateChart();
            await sleep(1001 - sortSpeed);
        }
        setBarColor(j, '#4a90e2');
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    updateChart();
    await sleep(1001 - sortSpeed);
    setBarColor(high, '#4a90e2');
    setBarColor(i + 1, 'green');
    playSound();
    return i + 1;
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    setBarColor(i, 'red');
    if (left < n) setBarColor(left, 'red');
    if (right < n) setBarColor(right, 'red');
    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;
    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      updateChart();
      await sleep(1001 - sortSpeed);
      setBarColor(i, '#4a90e2');
      setBarColor(left, '#4a90e2');
      setBarColor(right, '#4a90e2');
      await heapify(n, largest);
    } else {
      setBarColor(i, '#4a90e2');
      if (left < n) setBarColor(left, '#4a90e2');
      if (right < n) setBarColor(right, '#4a90e2');
    }
  }
  
async function heapSort() {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      await heapify(array.length, i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      setBarColor(0, 'red');
      setBarColor(i, 'red');
      [array[0], array[i]] = [array[i], array[0]];
      updateChart();
      await sleep(1001 - sortSpeed);
      setBarColor(0, '#4a90e2');
      setBarColor(i, 'green');
      playSound();
      await heapify(i, 0);
    }
    setBarColor(0, 'green');
    playSound();
  }

function setBarColor(index, color) {
    const bar = chartContainer.children[index];
    if (bar) bar.style.backgroundColor = color;
  }
  
function finalizeSort() {
    const bars = document.getElementsByClassName('bar');
    for (let bar of bars) {
      bar.style.backgroundColor = '#4CAF50';
    }
  }
  
function updateArraySize() {
    arraySize = document.getElementById('arraySize').value;
    generateArray();
  }
  
function updateSortSpeed() {
    sortSpeed = document.getElementById('sortSpeed').value;
    console.log(`Updated sort speed to: ${sortSpeed}`);
  }
  
  
