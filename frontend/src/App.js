import React, { useEffect, useState } from 'react';
import { listCompanies, listOweners } from './DbCall';

require('dotenv').config()


function App() {

  const [ oweners, setOweners ] = useState([]);
  const [ companies, setCompanies ] = useState([]);

  //when the component mounts
  //cant by async since it would return a promise and useeffect returns a function (for cleanUp)
  useEffect( () => {
  const fetchOweners = async () => {
      const fetchedOweners = await listOweners();
      console.log(fetchedOweners);
      setOweners( fetchedOweners );
    };

    fetchOweners();
  }, []); //[] make only data fetch on mount with NO further its updates
  //props which would change that whole component would update [] = no updates 


  return (
    <div className="App">
      { oweners.map( ( prop, index ) => (
        <h1 key={ prop._id } > { prop.title }</h1>
      ) ) }
    </div>
  );
}

export default App;
