import React from 'react';
import * as sorting_algorithms from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';



const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 300;

//todo: fix color
const PRIMARY_COLOR = (255, 102, 102);
const SECONDARY_COLOR = ("green");
const SORTED_COLOR = "#e2552a";



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
                    const bar_one_style = bars[bar_one_index]?.style;
                    const bar_two_style = bars[bar_two_index]?.style;
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

    
    quickSort() {

        const animations = sorting_algorithms.quickSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('array-bar'); //should go before loop?
            const [action, bar1_index, new_height_one, bar2_index, new_height_two] = animations[i];
            const bar1_style = bars[bar1_index]?.style;
            const bar2_style = bars[bar2_index]?.style;

            if (action === 'compare') {
                const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    bar1_style.backgroundColor = color;
                    if (bar2_style) bar2_style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    bar1_style.height = `${new_height_one}px`;
                    if (bar2_style) bar2_style.height = `${new_height_two}px`;
                    bar1_style.backgroundColor = SORTED_COLOR; 
                    if (bar2_style) bar2_style.backgroundColor = SORTED_COLOR; 
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        const animations = sorting_algorithms.heapSort(this.state.array);
        const bars = document.getElementsByClassName('array-bar');
    
        for (let i = 0; i < animations.length; i++) {
            const [action, bar1_index, new_height1, bar2_index, new_height2] = animations[i];
    
            const bar1_style = bars[bar1_index].style;
            const bar2_style = bars[bar2_index]?.style;
    
            if (action === 'compare') {
                const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    bar1_style.backgroundColor = color;
                    if (bar2_style) bar2_style.backgroundColor = color;
                    setTimeout(() => {
                        bar1_style.backgroundColor = PRIMARY_COLOR;
                        if (bar2_style) bar2_style.backgroundColor = PRIMARY_COLOR;
                    }, ANIMATION_SPEED_MS);
                }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    bar1_style.height = `${new_height1}px`;
                    if (bar2_style) bar2_style.height = `${new_height2}px`;

                    setTimeout(() => {
                        bar1_style.backgroundColor = PRIMARY_COLOR;
                        if (bar2_style) bar2_style.backgroundColor = PRIMARY_COLOR;
                    }, ANIMATION_SPEED_MS);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }



    bubbleSort() {


        const animations = sorting_algorithms.bubbleSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('array-bar');
            const [action, bar1_index, new_height1, bar2_index, new_height2] = animations[i];
            const bar1_style = bars[bar1_index]?.style;
            const bar2_style = bars[bar2_index]?.style;
    
            if (action === 'compare') {
                const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    bar1_style.backgroundColor = color;
                    if (bar2_style) bar2_style.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else if (action === 'swap') {
                setTimeout(() => {
                    bar1_style.height = `${new_height1}px`;
                    if (bar2_style) bar2_style.height = `${new_height2}px`;
                    setTimeout(() => {
                        bar1_style.backgroundColor = SORTED_COLOR;
                        if (bar2_style) bar2_style.backgroundColor = SORTED_COLOR;
                    }, ANIMATION_SPEED_MS);
                }, i * ANIMATION_SPEED_MS);
            }
        }
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
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="new-array-button" onClick={() => this.resetArray()}>New Array</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
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
        console.log(arrays_equal(quickied, correct_sorted));
        console.log(arrays_equal(bubbled, correct_sorted));
        console.log(arrays_equal(heaped, correct_sorted));
    }
}




