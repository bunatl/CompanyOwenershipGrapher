import React, { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContextComponent';

export const Graph = () => {
    const { graphData } = useContext(GraphContext);

    return (
        <div id='graph'>
            {graphData.companiesTree.map((item, i) => {
                // there will be log n rows
                return (i <= Math.ceil(Math.log(graphData.companiesTree.length)))
                    ? (
                        <div className='graphRow' key={i}>
                            {graphData.companiesTree.map((obj, j) => {
                                // in each row start where last row ended
                                return (j + 1 >= Math.pow(2, i) && j + 1 < Math.pow(2, i + 1))
                                    ? <div key={`${i}${j}`} className='graphNode'>
                                        <div className='graphCircle'></div>
                                        <div>{graphData.companiesTree[ j ].name}</div>
                                        <div>{graphData.companiesTree[ j ].ico}</div>
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
