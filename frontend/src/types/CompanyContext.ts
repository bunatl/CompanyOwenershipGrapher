export type ReducerActions =
    | { type: 'SETICO'; payloadIco: string }
    | { type: 'SWITCHASIDE'; payloadIco: string }
    | { type: 'RESET' }


export interface ICompany {
    name: string;
    ico: string;
}

export interface IData {
    ico: string;
    asideOpen: boolean;
    selectedCompany: string;
}

export interface IContext {
    companyData: IData;
    dispatch: React.Dispatch<ReducerActions>;
}