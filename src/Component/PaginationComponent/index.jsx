import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
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
                    direction: "rtl",
                    "& .MuiPaginationItem-root": {
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #724780",
                        color: "#724780",
                        width: 40,
                        height: 40,
                        fontSize: "18px", // يخلي الأيقونات واضحة
                    },
                    "& .Mui-selected": {
                        backgroundColor: "#724780 !important",
                        color: "#fff",
                        opacity: 1,
                        "&:hover": {
                            backgroundColor: "#5b3666 !important",
                        },
                    },
                }}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        slots={{
                            previous: () => <MdArrowForwardIos size={16} />, // سهم للخلف
                            next: () => <  MdArrowBackIosNew  size={16} />,     // سهم للأمام
                        }}
                        page={arabicNumbers(item.page)}
                    />
                )}
            />
        </Stack>

    )
}
