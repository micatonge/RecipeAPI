import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // Assuming you have an input component
import { Button } from "@/components/ui/button"; // Assuming you have a button component

// SearchBar component with onSearch function as a prop
const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    // State to manage the query input
    const [query, setQuery] = useState('');
    
    // Handler function to update the query state when input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };
    
    // Handler function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior
        onSearch(query.trim()); // Calls the onSearch function with the trimmed query string
    };
            
    return (
        // Form component with onSubmit event handler
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Input field for search query */}
            <div style={{ flex: '1', maxWidth: '60%', borderRadius: '999px', overflow: 'hidden', marginRight: '8px' }}>
                <Input type="text" value={query} onChange={handleChange} placeholder="Search" style={{ width: '100%', padding: '12px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '999px', outline: 'none' }} />
            </div>
            {/* Button for submitting the search query */}
            <Button type="submit" style={{ backgroundColor: 'red', color: 'white', borderRadius: '999px', padding: '12px', border: 'none', cursor: 'pointer' }}>Search</Button>
        </form>
    );
};

export default SearchBar;
