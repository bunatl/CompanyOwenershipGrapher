import React, { useState, createContext, useMemo, useEffect } from 'react';
import { listOweners } from '../utils/DbCall';
import { Search } from './Search';
import { Graph } from './Graph';

import '../styles/main.scss';

export const GlobalContext = createContext<any>({});
export const App = () => {
  const [ ico, setIco ] = useState<string>("");
  const providerValue = useMemo(() => ({ ico, setIco }), [ ico, setIco ])

  useEffect(() => {
    // fetch company based on the ICO
    const callAsynchronously = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/company/${ico}`);
        // console.log(res);
        const resJSON = await res.json();
        console.log(resJSON);
      } catch (err) {
        console.error(err);
      }
    }
    if (ico !== '') callAsynchronously();
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
