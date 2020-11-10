import React from 'react';


export const Graph = () => {
    const arr = [ { text: 1 }, { text: 2 }, { text: 3 }, { text: 4 }, { text: 5 }, { text: 6 }, { text: 7 }, { text: 8 }, { text: 9 } ];
    // const arr = [ { text: 1 } ];
    return (
        <div id='graph'>
            {arr.map((item, i) => {
                // there will be log n rows
                return (i <= Math.ceil(Math.log(arr.length)))
                    ? (
                        <div className='graphRow' key={i}>
                            {arr.map((obj, j) => {
                                // in each row start where last row ended
                                return (j + 1 >= Math.pow(2, i) && j + 1 < Math.pow(2, i + 1))
                                    ? <div key={`${i}${j}`} className='graphNode'>
                                        <div className='graphCircle'></div>
                                        <div>{obj.text}</div>
                                        <div>23616454</div>
                                    </div>
                                    : '';
                            })}
                        </div>
                    )
                    : '';
            })}
        </div>
    );
}
