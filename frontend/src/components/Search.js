import React, { useState } from 'react';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Search (props) {
    const [ icoForFetch, setMyUrl ] = useState("");

    function setUrlFromInput (e) {
        setMyUrl(e.target.value);
    }

    // e (event) is provided by default
    // custom method doesnt have this by deafult
    // 1. bind(this) onto method in the component
    // 2. use arrow function (it automaps this from outer of the function)
    const searchico = async (e) => {
        //prevents default element's event 
        e.preventDefault();
        if (icoForFetch == "") return;

        const dataToSend = {
            ico: icoForFetch
        };

        const url = "http://localhost:1337";
        await fetch(`${ url }/invoke/getico`, {
            // headers need to be set
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(dataToSend)
        })
            .then((res) => {
                // clear input field
                setMyUrl("");

                // parse body text as a JSON
                res
                    .json()
                    .then((jsonData) => {
                        // send data to parent component (component drilling)
                        props.onChange(jsonData);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

    };

    // search ICO, name
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search by ICO"
                    aria-label="icoNumber"
                    aria-describedby="icoNumber"
                    value={ icoForFetch }
                    // can be called JS-like with () and "" or as anonymus arrow func
                    onChange={ setUrlFromInput }
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