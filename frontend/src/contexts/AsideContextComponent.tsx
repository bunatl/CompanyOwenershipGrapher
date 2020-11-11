import React, { createContext, FC, useMemo, useReducer } from 'react'

type ReducerActions =
    | { type: 'SETICO'; payload: string }
    | { type: 'SWITCHASIDE'; payload: string }
    | { type: 'RESET' }

interface IData {
    currentCompany: string;
    showAside: boolean;
}

const initData: IData = {
    currentCompany: '',
    showAside: false
}

const reducer = (state: IData = initData, action: ReducerActions) => {
    switch (action.type) {
        case 'SETICO':
            return {
                ...state,
                currentCompany: action.payload
            };
        case 'SWITCHASIDE':
            return {
                ...state,
                showAside: (state.currentCompany === action.payload) ? !state.showAside : state.showAside
            };
        case 'RESET':
            return initData
        default:
            return state;
    }
}

interface IContext {
    asideData: IData;
    dispatch: React.Dispatch<ReducerActions>;
}

export const AsideContext = createContext<IContext>({ asideData: initData, dispatch: () => ({ type: 'RESET' }) });
export const AsideContextComponent: FC = ({ children }) => {
    const [ asideData, dispatch ] = useReducer(reducer, initData);
    const AsideValue = useMemo(() => ({ asideData, dispatch }), [ asideData, dispatch ]);

    return (
        <AsideContext.Provider value={AsideValue} >
            { children}
        </AsideContext.Provider>
    )
}
