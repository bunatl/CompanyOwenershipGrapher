import React, { useContext, useEffect, useState } from 'react';

import { IContext, ICompany } from '../types/CompanyContext';
import { FetchCompany } from '../utils/FetchCompany';
import { CompanyContext } from '../contexts/CompanyContext';

export const Graph = () => {
    const { companyData, dispatch } = useContext<IContext>(CompanyContext);
    const [ companiesTree, setCompaniesTree ] = useState<ICompany[]>([]);

    useEffect(() => {
        const callAsynchronosly = async () => {
            try {
                const res = await FetchCompany(companyData.selectedCompany);
                // console.log(res);
                // setCompaniesTree(res);
            } catch (err) {
                console.log('An error has occured. The error:');
                console.error(err);
            }
        }

        callAsynchronosly();
    }, [ companyData.selectedCompany ])


    return (
        <div id='graph'>
            {/* display only if companiesTree array is NOT empty */}
            {companiesTree && companiesTree.map((item, i) => {
                // there will be log n rows
                return (i <= Math.ceil(Math.log(companiesTree.length)))
                    ? (
                        <div className='graphRow' key={i}>
                            {companiesTree.map((obj, j) => {
                                // in each row start where last row ended
                                return (j + 1 >= Math.pow(2, i) && j + 1 < Math.pow(2, i + 1))
                                    ? <div
                                        key={`${i}${j}`}
                                        className='graphNode'
                                        onClick={() => dispatch({ type: 'SWITCHASIDE', payloadIco: companiesTree[ j ].ico })}>
                                        <div className='graphCircle'></div>
                                        <div>{companiesTree[ j ].name}</div>
                                        <div>{companiesTree[ j ].ico}</div>
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
