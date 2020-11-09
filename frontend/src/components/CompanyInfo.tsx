import React, { FC } from 'react'

interface ICompanyInfo {
    company: string;
}

export const CompanyInfo: FC<ICompanyInfo> = ({ company }) => {

    return (
        <aside>
            <div>
                <div>Název</div>
                <div></div>
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