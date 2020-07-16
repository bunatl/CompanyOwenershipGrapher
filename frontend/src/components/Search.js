import React from 'react';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Search (props) {

    async function searchico () {
        //prevents default element's event 
        // e.preventDefault();

        const dataToSend = {
            ico: "29448310"
        };

        const url = "http://localhost:1337";
        const res = await fetch(`${ url }/invoke/getico`, {
            // headers need to be set
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataToSend)
        });

        console.log(res);
    };

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
                    <Button
                        variant="outline-secondary"
                        onClick={ searchico }
                    >
                        Search ICO
                    </Button>
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