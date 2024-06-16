import React from 'react';
import * as sorting_algorithms from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';



const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 250;
const PRIMARY_COLOR = (255, 102, 102);
const SECONDARY_COLOR = (255, 102, 102);


export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(random_int(5, 950));
        }
        this.setState({ array });
    }

    mergeSort() {

        //test_sorting_algorithms();

        const animations = sorting_algorithms.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('array-bar');
            const change_color = i % 3 !== 2;
            if (change_color) {
                    const[bar_one_index, bar_two_index] = animations[i];
                    const bar_one_style = bars[bar_one_index].style;
                    const bar_two_style = bars[bar_two_index].style;
                    const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                        bar_one_style.backgroundColor = color;
                        bar_two_style.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [bar_one_index, newHeight] = animations[i];
                    const bar_one_style = bars[bar_one_index].style;
                    bar_one_style.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    } 

    
    quick_sort() {
        return;
    }

    heap_sort() {
        return;
    }

    bubble_sort() {
        return;
    }

    render() {
        const { array } = this.state;
        return (
            <div className="array-container">
                <div className="bars-wrapper">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}px` }}
                        >
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quick_sort()}>Quick Sort</button>
                    <button className="new-array-button" onClick={() => this.resetArray()}>New Array</button>
                    <button onClick={() => this.heap_sort()}>Heap Sort</button>
                    <button onClick={() => this.bubble_sort()}>Bubble Sort</button>
                </div>
            </div>
        );
    }
    
}

// inclusive
function random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arrays_equal(arr1, arr2) {

    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true ;
}

function test_sorting_algorithms() {

    for (let i = 0; i < 100; i++) {
        const array = [];
        const length = random_int(1, 500);
        for (let j = 0; j < length; j++) {
            array.push(random_int(-500, 500));
        }
        const correct_sorted = array.slice().sort((a, b) => a - b);

        const merged = sorting_algorithms.mergeSort(array);
        const quickied = sorting_algorithms.quickSort(array);
        const bubbled = sorting_algorithms.bubbleSort(array);
        const heaped = sorting_algorithms.heapSort(array);

        console.log(arrays_equal(merged, correct_sorted));
        // console.log(arrays_equal(quickied, correct_sorted));
        // console.log(arrays_equal(bubbled, correct_sorted));
        // console.log(arrays_equal(heaped, correct_sorted));
    }
}




