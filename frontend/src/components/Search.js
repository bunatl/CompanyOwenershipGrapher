import React from 'react';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Search(props) {
    // search ICO, name
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by ICO"
                    aria-label="icoNumber"
                    aria-describedby="icoNumber"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Search ICO</Button>
                </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by name"
                    aria-label="name"
                    aria-describedby="companyOwener"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Search name</Button>
                </InputGroup.Append>
            </InputGroup>
      </div>
    );
  }

  export default Search;