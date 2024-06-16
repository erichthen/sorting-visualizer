import React from 'react';
import * as sorting_algorithms from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';


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
        for (let i = 0; i < 330; i++) {
            array.push(random_int(5, 950));
        }
        this.setState({ array });
    }

    mergeSort() {

        //temporary tests on sorts

        let arr = [40, -20, 30, 10, 50, 5];
        let ans = [-20, 5, 10, 30, 40, 50];
        const my_sort = sorting_algorithms.mergeSort(arr);
        console.log(arrays_equal(ans, my_sort));
        
    }
    
    quick_sort() {

        let arr = [40, -20, 30, 10, 50, 5];
        let ans = [-20, 5, 10, 30, 40, 50];
        const my_sort = sorting_algorithms.quickSort(arr);
        console.log(arrays_equal(ans, my_sort));
    }

    heap_sort() {
        let arr = [40, -20, 30, 10, 50, 5];
        let ans = [-20, 5, 10, 30, 40, 50];
        const my_sort = sorting_algorithms.heapSort(arr);
        console.log(arrays_equal(ans, my_sort));
    }

    bubble_sort() {
        let arr = [40, -20, 30, 10, 50, 5];
        let ans = [-20, 5, 10, 30, 40, 50];
        const my_sort = sorting_algorithms.bubbleSort(arr);
        console.log(arrays_equal(ans, my_sort));
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


