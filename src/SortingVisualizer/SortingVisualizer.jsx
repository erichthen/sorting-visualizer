import React from 'react';
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

    merge_sort() {
        
    }
    
    quick_sort() {

    }

    heap_sort() {

    }

    bubble_sort() {


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
                    <button onClick={() => this.merge_sort()}>Merge Sort</button>
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
