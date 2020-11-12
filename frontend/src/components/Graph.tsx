import React, { useContext } from 'react';

import { IContext } from '../types/CompanyContext'
import { CompanyContext } from '../contexts/CompanyContext';

export const Graph = () => {
    const { companyData, dispatch } = useContext<IContext>(CompanyContext);

    return (
        <div id='graph'>
            {companyData.companiesTree.map((item, i) => {
                // there will be log n rows
                return (i <= Math.ceil(Math.log(companyData.companiesTree.length)))
                    ? (
                        <div className='graphRow' key={i}>
                            {companyData.companiesTree.map((obj, j) => {
                                // in each row start where last row ended
                                return (j + 1 >= Math.pow(2, i) && j + 1 < Math.pow(2, i + 1))
                                    ? <div
                                        key={`${i}${j}`}
                                        className='graphNode'
                                        onClick={() => dispatch({ type: 'SWITCHASIDE', payloadIco: companyData.companiesTree[ j ].ico })}>
                                        <div className='graphCircle'></div>
                                        <div>{companyData.companiesTree[ j ].name}</div>
                                        <div>{companyData.companiesTree[ j ].ico}</div>
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
