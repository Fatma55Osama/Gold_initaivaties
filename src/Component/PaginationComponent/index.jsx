import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
export default function PaginationComponent(props) {
    const { current, handle, total } = props;

    const handleChange = (_, value) => {
        handle(value);
    };
    const arabicNumbers = (n) =>
        n?.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

    return (

        <Stack spacing={2} direction="row" justifyContent="center" dir="rtl">

            <Pagination
                count={total}
                page={current}
                onChange={handleChange}
                shape="rounded"
                sx={{
                    direction: 'rtl',
                    '& .MuiPaginationItem-root': {
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #724780',
                        color: '#724780',
                    },
                    '& .Mui-selected': {
                        backgroundColor: '#724780',
                        color: 'black',
                    },
                }}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        page={arabicNumbers(item.page)}
                    />
                )}
            />

        </Stack>

    )
}
