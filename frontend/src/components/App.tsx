import React, { useState, createContext, useMemo, useEffect } from 'react';
import { listOweners } from '../utils/DbCall';
import { Search } from './Search';
import { Graph } from './Graph';

import '../styles/main.scss';

export const GlobalContext = createContext<any>({});
export const App = () => {
  const [ ico, setIco ] = useState<string>("");
  const providerValue = useMemo(() => ({ ico, setIco }), [ ico, setIco ])
  console.log(ico);

  useEffect(() => {
    // fetch company based on the ICO
  }, [ ico ])

  return (
    <div className="App">
      <GlobalContext.Provider value={providerValue} >

        {/* 
        * search for name and ICO
        * result field with graph
      */}
        <Search />
        <Graph />
      </GlobalContext.Provider>
    </div>
  );
};
