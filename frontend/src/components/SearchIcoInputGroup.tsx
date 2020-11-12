import React, { useState, useContext } from 'react';

import { IContext } from '../types/CompanyContext'
import { CompanyContext } from '../contexts/CompanyContext';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { validateICO } from '../utils/IcoValidation'

export const SearchIcoInputGroup = () => {
    const { companyData, dispatch } = useContext<IContext>(CompanyContext);
    const [ inputIcoValue, setInputIcoValue ] = useState<string>("");

    const searchICO = () => {
        if (!validateICO(inputIcoValue))
            alert('Invalid ICO. Please enter valid ICO.')
        else {
            // set to global context
            dispatch({
                type: "SETICO",
                payloadIco: inputIcoValue
            })
            // clear input
            setInputIcoValue('');
        }
    }

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder={companyData.ico}
                aria-label="icoNumber"
                aria-describedby="icoNumber"
                value={inputIcoValue}
                onChange={e => setInputIcoValue(e.target.value)}
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