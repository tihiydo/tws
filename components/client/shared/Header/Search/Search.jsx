import classes from './search.module.scss';
import {useEffect, useRef, useState} from "react";
import {ClickAwayListener, InputBase, Popper} from "@mui/material";
import useDebounce from "@/components/client/shared/Header/Search/useDebonce";
import {styled, alpha} from '@mui/material/styles';
import {MdSearch} from 'react-icons/md'
import SearchOption from "@/components/client/shared/Header/Search/SearchOption";
import useSearch from "@/components/client/shared/Header/Search/useSearch";
import {useTranslations} from "next-intl";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 16,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const SearchInput = () => {
    const [isProductsVisible, setIsProductsVisible] = useState(false);
    const {
        setSearchTerm,
        searchTerm,
        searchResults
    } = useSearch();

    const anchorRef = useRef(null);
    const button = useTranslations('buttons')

    return (
        <ClickAwayListener onClickAway={() => setIsProductsVisible(false)}>
            <div>

                <Search ref={anchorRef}>
                    <SearchIconWrapper>
                        <MdSearch size={20}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onFocus={() => setIsProductsVisible(true)}
                        placeholder={button('search')}
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                <Popper
                    style={{zIndex: 50}}
                    modifiers={[
                        {
                            name: "offset",
                            options: {
                                offset: [-150, 15],
                            },
                        },
                    ]}
                    autoFocus={false}
                    anchorEl={anchorRef?.current}
                    open={Boolean(isProductsVisible && searchResults?.length)}
                    onClose={() => setIsProductsVisible(false)}
                >

                    <div style={{
                        background: "#fff",
                        borderRadius: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        width: 500,
                        // box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
                        boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px'
                    }}>
                        {searchResults?.map(product =>
                            <SearchOption product={product} closePopup={() => setIsProductsVisible(false)}/>
                        )}
                    </div>


                </Popper>
            </div>

        </ClickAwayListener>

    );
};

export default SearchInput;