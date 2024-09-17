import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import useSearch from "@/components/client/shared/Header/Search/useSearch";
import {MdSearch} from "react-icons/md";
import {GrClose} from "react-icons/gr";
import MobileSearchOption from "@/components/client/shared/Header/Search/MobileSearchOption";
import { useTranslations } from 'next-intl';

const SearchDrawer = () => {

    const {
        setSearchTerm,
        searchTerm,
        searchResults,
        loading,
        debouncedSearchTerm
    } = useSearch();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const button = useTranslations('buttons')

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div>
            <IconButton onClick={handleToggleDrawer} color="inherit">
                <MdSearch size={'1.3em'} />
            </IconButton>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div style={{ padding: '16px', position: 'relative' }}>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
                        {button('search')}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
                        <IconButton style={{position: 'absolute', right: 10, top: 10}} onClick={handleToggleDrawer} color="inherit">
                            <GrClose size={14} />
                        </IconButton>
                    </div>
                    <TextField
                        InputProps={{
                            style: {borderRadius: 16}
                        }}
                        label={button('search')}
                        placeholder={button('enter')}
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    {loading && <LinearProgress style={{ marginTop: '8px' }} />}
                    <List style={{ marginTop: '16px' }}>
                        {searchResults?.map((result) => (
                            <MobileSearchOption product={result} closePopup={handleToggleDrawer} />
                        ))}
                        {
                            Boolean(debouncedSearchTerm && !loading && !searchResults?.length)
                                ? <ListItemText primary={`По запиту "${debouncedSearchTerm}" нічого не знайдено`} />
                                : null
                        }
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default SearchDrawer;
