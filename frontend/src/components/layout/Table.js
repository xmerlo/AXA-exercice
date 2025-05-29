import React from "react";
import { Table as MuiTable} from "@mui/material";

const Table = (props) => {
    return <MuiTable {...props} sx={{
        minWidth: 650,
        border: '1px solid #ccc',
        '& th': {
          backgroundColor: "primary.main",
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
        },
        '& td': {
          fontSize: '0.95rem',
          borderBottom: '1px solid #eee',
        },
        '& tr:hover': {
          backgroundColor: "lightgray",
        }}} />;
};

export default Table;