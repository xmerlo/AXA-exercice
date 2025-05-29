import React from "react";
import { TableSortLabel as MuiTableSortLabel } from "@mui/material";

const TableSortLabel = (props) => {
    return <MuiTableSortLabel {...props} sx={{
        color: 'white',
        ":hover": {
          color: "white",
          fontWeight: "bold",
        },
        '&.Mui-active': {
          color: "white",
        },
        '& .MuiTableSortLabel-icon': {
          color: "white !important",
        }
      }} />;
};

export default TableSortLabel;