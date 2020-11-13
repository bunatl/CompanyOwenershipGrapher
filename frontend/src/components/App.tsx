import React, { useContext } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';
import { CustomFooter } from './CustomFooter';
import { CompanyInfo } from './CompanyInfo';

import { IContext } from '../types/CompanyContext'
import { CompanyContext } from '../contexts/CompanyContext';

import '../styles/main.scss';

// test ICO 48110566
export const App = () => {
  const { companyData } = useContext<IContext>(CompanyContext);

  return (
    <div className="App">
      <header><h1>Generátor vazeb mezi českými společnostmi</h1></header>
      <div id="content">
        <main>
          <Search />
          <Graph />
        </main>
        {companyData.asideOpen ? <CompanyInfo /> : ''}
      </div>
      <CustomFooter />
    </div>
  );
};
