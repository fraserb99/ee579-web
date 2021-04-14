import { makeStyles, Typography } from '@material-ui/core';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import React from 'react';

const NoRowsComponent = name => (props) => <GridOverlay>No {name} found</GridOverlay>

const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(0, 1),
        borderTop: 'none'
    },
}))

export const DataTable = ({rows, error, name, loading, components, ...props}) => {
    const classes = useStyles();

    return (
        <DataGrid
            className={classes.table}
            pageSize={10}
            disableColumnSelector
            disableColumnReorder
            disableSelectionOnClick
            autoHeight
            loading={loading && !rows.length}
            error={error && !rows.length || undefined}
            rows={rows}
            components={{
                NoRowsOverlay: NoRowsComponent(name)
            }}
            {...props}
        />
    )
}