import React, { useContext } from 'react';
import { Search } from './Search';
import { Graph } from './Graph';
import { CustomFooter } from './CustomFooter';
import { CompanyInfo } from './CompanyInfo';
import { AsideContextComponent, AsideContext } from '../contexts/AsideContextComponent';
import { GraphContextComponent } from '../contexts/GraphContextComponent';


import '../styles/main.scss';

export const App = () => {
  const { asideData } = useContext(AsideContext);

  return (
    <div className="App">
      <GraphContextComponent >
        <AsideContextComponent >
          <header><h1>Generátor vazeb mezi českými společnostmi</h1></header>
          <div id="content">
            <main>
              <Search />
              <Graph />
            </main>
            {asideData.showAside ? <CompanyInfo /> : ''}
          </div>
          <CustomFooter />
        </AsideContextComponent>
      </GraphContextComponent>
    </div>
  );
};
