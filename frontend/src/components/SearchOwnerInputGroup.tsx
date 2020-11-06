import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export const SearchOwnerInputGroup = () => {

    return (
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
    )
}