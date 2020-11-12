import React, { useContext, useEffect, useState } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';
import { CustomFooter } from './CustomFooter';
import { CompanyInfo } from './CompanyInfo';

import { FetchCompany } from '../utils/FetchCompany';

import { IContext } from '../types/CompanyContext'
import { CompanyContext } from '../contexts/CompanyContext';

import '../styles/main.scss';

// test ICO 48110566
export const App = () => {
  const { companyData, dispatch } = useContext<IContext>(CompanyContext);

  useEffect(() => {
    const callAsynchronosly = async () => {
      try {
        await FetchCompany(companyData.ico);
      } catch (err) {

      }
    }

    callAsynchronosly();
  }, [ companyData.ico ])

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
