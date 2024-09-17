import {useEffect, useState} from 'react';
import useDebounce from "@/components/client/shared/Header/Search/useDebonce";

const UseSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    // Use the debounce hook with a delay of 300 milliseconds
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Trigger the search when debouncedSearchTerm changes
    useEffect(() => {
        const handleSearch = async () => {
            if (!debouncedSearchTerm) {
                setSearchResults([]);
                return;
            }

            try {
                setLoading(true)
                const response = await fetch(`/api/search?query=${debouncedSearchTerm}`);
                const json = await response.json();

                setSearchResults(json.data);
            } catch (error) {
                setSearchResults([]);
                console.error("Error during search:", error);
            } finally {
                setLoading(false)
            }
        };

        handleSearch();
    }, [debouncedSearchTerm]);


    return {
        searchResults,
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        loading
    }
};

export default UseSearch;