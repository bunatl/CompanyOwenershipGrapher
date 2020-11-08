import React, { useState, createContext, useMemo, useEffect } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';
import { CustomFooter } from './CustomFooter'

import '../styles/main.scss';
import { FetchCompany } from '../utils/FetchCompany';

export const GlobalContext = createContext<any>({});
export const App = () => {
  const [ ico, setIco ] = useState<string>("");
  const [ myRes, setMyRes ] = useState<any>([]);
  const providerValue = useMemo(() => ({ ico, setIco }), [ ico, setIco ]);

  useEffect(() => {
    // fetch company based on the ICO
    const callFetchAsynchronously = async (ico: string) => {
      try {
        // set loading
        const res = await FetchCompany(ico);
        // se result
        // unset loading
      } catch (err) {
        console.error(err);
      }
    }
    if (ico !== '') callFetchAsynchronously(ico)
  }, [ ico ])

  return (
    <div className="App">
      <GlobalContext.Provider value={providerValue} >
        <header><h1>Generátor vazeb mezi českými společnostmi</h1></header>
        <div id="content">
          <main>
            <Search />
            <Graph />
          </main>
          <aside>Info o společnosti</aside>
        </div>
        <CustomFooter />
      </GlobalContext.Provider>
    </div>
  );
};
