"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import {
    GridColumnHeaderParams,
    type GridColDef,
    DataGrid,
} from "@mui/x-data-grid";
import { APIRequest } from "@prisma/client";
import { useTheme } from "next-themes";
import { FC } from "react";

const initialCols: GridColDef[] = [
    {
        field: "col1",
        headerName: "API Key",
        width: 400,
        renderHeader(p) {
            return (
                <strong className="font-semibold">
                    {p.colDef.headerName} 🗝️
                </strong>
            );
        },
    },

    {
        field: "col2",
        headerName: "Path",
        width: 250,
    },

    {
        field: "col3",
        headerName: "Status",
        width: 190,
    },

    {
        field: "col4",
        headerName: "Duration",
        width: 188,
    },

    {
        field: "col5",
        headerName: "Recency",
        width: 250,
    },
];

const cols = initialCols.map((col) => {
    if (col.field === "col1") return col;

    return {
        ...col,
        renderHeader(p: GridColumnHeaderParams<any, any, any>) {
            return (
                <strong className="font-semibold">{p.colDef.headerName}</strong>
            );
        },
    };
});

type ModifiedRequestType<AK extends keyof APIRequest> = Omit<APIRequest, AK> & {
    timestamp: string;
};

interface TableProps {
    userRequests: ModifiedRequestType<"timestamp">[];
}

const Table: FC<TableProps> = ({ userRequests }) => {
    const { theme: applicationTheme } = useTheme();

    const theme = createTheme({
        palette: {
            mode: applicationTheme === "dark" ? "dark" : "light",
        },
    });

    const rows = userRequests.map((req) => ({
        id: req.id,
        col1: req.usedApiKey,
        col2: req.path,
        col3: req.status,
        col4: `${req.duration} ms`,
        col5: `${req.timestamp} ago..`,
    }));

    return (
        <ThemeProvider theme={theme}>
            <DataGrid
                style={{
                    backgroundColor:
                        applicationTheme === "dark" ? "#152238" : "white",
                    fontSize: "1rem",
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                columns={cols}
                rows={rows}
            ></DataGrid>
        </ThemeProvider>
    );
};

export default Table;
