import React, { useState, useContext } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateICO } from '../utils/IcoValidation'

export const SearchIcoInputGroup = () => {
    const [ inputIco, setInputIco ] = useState<string>("");

    const searchICO = () => {
        if (validateICO(inputIco)) {
            // set to global context
            // setIco(inputIco);
            return;
        }

        alert('Invalid ICO. Please enter valid ICO.')
    }

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Search by ICO"
                aria-label="icoNumber"
                aria-describedby="icoNumber"
                value={inputIco}
                onChange={e => setInputIco(e.target.value)}
            />
            <InputGroup.Append>
                <Button
                    variant="outline-secondary"
                    onClick={searchICO}
                >
                    Search ICO
                    </Button>
            </InputGroup.Append>
        </InputGroup>
    )
}