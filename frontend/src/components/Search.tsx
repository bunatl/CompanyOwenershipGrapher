import React from 'react';
import { SearchIcoInputGroup } from './SearchIcoInputGroup'
import { SearchOwnerInputGroup } from './SearchOwnerInputGroup'

export const Search = () => {
    // search ICO, name
    return (
        <div>
            <SearchIcoInputGroup />
            <SearchOwnerInputGroup />
        </div>
    );
}
