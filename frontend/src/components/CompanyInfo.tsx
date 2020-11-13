import React, { FC, useContext, useEffect, useState } from 'react';
import { IContext } from '../types/CompanyContext'
import { CompanyContext } from '../contexts/CompanyContext';
import { FetchCompany } from '../utils/FetchCompany';

export const CompanyInfo: FC = () => {
    const { companyData } = useContext<IContext>(CompanyContext);
    const [ fetchedCompany, setFetchedCompany ] = useState<any>({});

    useEffect(() => {
        const callAsynchronosly = async () => {
            console.log('test');
            console.log(typeof companyData.selectedCompany);

            try {
                const res = await FetchCompany(companyData.selectedCompany);
                setFetchedCompany(res);
            } catch (err) {
                console.log('An error has occured. The error:');
                console.error(err);
            }
        }

        console.log('test2');
        if (companyData.selectedCompany !== '') callAsynchronosly();
    }, [ companyData.selectedCompany, companyData.asideOpen ])

    return (
        <aside>
            <div>
                <div>Název</div>
                <div>{JSON.stringify(2, null, fetchedCompany)}</div>
            </div>
            <div>
                <div>IČO</div>
                <div></div>
            </div>
            <div>
                <div>Právní forma</div>
                <div></div>
            </div>
            <div>
                <div>Stav</div>
                <div></div>
            </div>
            <div>
                <div>Sídlo</div>
                <div></div>
            </div>
            <div>
                <div>Činnosti</div>
                <div></div>
            </div>
            <div>
                <div>Kapitál</div>
                <div></div>
            </div>
            <div>
                <div>Statutární orgány</div>
                <div></div>
            </div>
        </aside>
    )
}