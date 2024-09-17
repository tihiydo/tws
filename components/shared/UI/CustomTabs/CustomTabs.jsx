import React from 'react';
import { Tabs, Tab } from '@mui/material';

const CustomTabs = ({value, setValue, options }) => {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            style={{
                display: 'inline-flex',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                marginBottom: '10px',
                height: '50px',
                minHeight: '50px',
            }}
            TabIndicatorProps={{
                style: {display: 'none'}
            }}
        >
            {options.map((option) => (
                <Tab
                    value={option.value}
                    key={option.value}
                    style={{
                        minWidth: 0,
                        padding: '10px 20px',
                        color: value === option.value ? '#646464' : '#9e9e9e',
                        height: '50px',
                        minHeight: '50px',
                        transition: 'color 0.3s ease',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                    }}
                    icon={option.picture}
                    iconPosition={'start'}
                    label={option.label}
                />
            ))}
        </Tabs>
    );
};

export default CustomTabs;
