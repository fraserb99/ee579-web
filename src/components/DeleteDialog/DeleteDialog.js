import { Button, colors, createMuiTheme, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MuiThemeProvider } from '@material-ui/core';
import React, { useContext } from 'react';
import { DeleteContext } from './DeleteContext';
import { useDeleteState } from './useDeleteState';

const deleteTheme = createMuiTheme({
    palette: {
        primary: colors.red
    }
})

export const DeleteDialog = () => {
    const [deleteState, setDeleteState] = useDeleteState();
    const {
        open,
        deleteAction,
        deleteText,
        helperText,
        btnText,
    } = deleteState;

    const handleClose = () => {
        setDeleteState({open: false})
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{deleteText}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {helperText}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>
                Cancel
            </Button>
            <MuiThemeProvider theme={deleteTheme}>
                <Button onClick={deleteAction} color="primary" autoFocus>
                    {btnText || 'Delete'}
                </Button>
            </MuiThemeProvider>
            </DialogActions>
        </Dialog>
    )
}