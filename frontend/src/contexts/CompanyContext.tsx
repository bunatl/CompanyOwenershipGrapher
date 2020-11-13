import React, { createContext, FC, useMemo, useReducer } from 'react';
import { IData, ReducerActions, IContext } from '../types/CompanyContext'

const initData: IData = {
    ico: 'Search by ICO',
    asideOpen: false,
    selectedCompany: ''
}

const reducer = (state: IData = initData, action: ReducerActions) => {
    switch (action.type) {
        case 'SETICO':
            // process to set whole company tree
            return {
                ...state,
                asideOpen: true,
                ico: action.payloadIco
            };
        case 'SWITCHASIDE':
            if (action.payloadIco === state.selectedCompany) return ({ ...state, asideOpen: false });
            return {
                ...state,
                selectedCompany: action.payloadIco,
                asideOpen: true
            };
        case 'RESET':
            return initData
        default:
            return state;
    }
}

export const CompanyContext = createContext<IContext>({ companyData: initData, dispatch: () => ({}) });
export const CompannyContextComponent: FC = ({ children }) => {
    const [ companyData, dispatch ] = useReducer(reducer, initData);
    const CompanyValue = useMemo(() => ({ companyData, dispatch }), [ companyData, dispatch ]);

    return (
        <CompanyContext.Provider value={CompanyValue} >
            { children}
        </CompanyContext.Provider>
    )
}
