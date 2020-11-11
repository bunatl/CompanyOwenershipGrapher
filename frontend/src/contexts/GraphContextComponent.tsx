import React, { createContext, FC, useMemo, useReducer } from 'react'

type ReducerActions =
    | { type: 'SETICO'; payload: string }
    | { type: 'COMPANIESTREE'; payload: ICompany }
    | { type: 'RESET' }

interface ICompany {
    name: string;
    ico: string;
}

interface IData {
    ico: string;
    companiesTree: ICompany[];
}

const company: ICompany = {
    name: 'test',
    ico: ''
}

const initData: IData = {
    ico: '',
    companiesTree: [ company, company, company, company, company ]
}

const reducer = (state: IData = initData, action: ReducerActions) => {
    switch (action.type) {
        case 'SETICO':
            return {
                ...state,
                ico: action.payload
            };
        case 'COMPANIESTREE':
            return {
                ...state,
                companiesTree: [ ...state.companiesTree, action.payload ]
            };
        case 'RESET':
            return initData
        default:
            return state;
    }
}

interface IContext {
    graphData: IData;
    dispatch: React.Dispatch<ReducerActions>;
}

export const GraphContext = createContext<IContext>({ graphData: initData, dispatch: () => ({ type: 'RESET' }) });
export const GraphContextComponent: FC = ({ children }) => {
    const [ graphData, dispatch ] = useReducer(reducer, initData);
    const GraphValue = useMemo(() => ({ graphData, dispatch }), [ graphData, dispatch ]);

    return (
        <GraphContext.Provider value={GraphValue} >
            { children}
        </GraphContext.Provider>
    )
}
