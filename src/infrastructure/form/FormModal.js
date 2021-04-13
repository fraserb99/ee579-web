import { Dialog, DialogTitle } from '@material-ui/core';
import { useFormik, useFormikContext } from 'formik';
import React, { useCallback, useState } from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

export const FormModal = ({title, path, component: Component, container, show, setShow, ...props}) => {
    const history = useHistory();
    const match = useRouteMatch();
    const handleClose = useCallback(() => setShow ? setShow(false) : history.push(match.url))

    // const Component = container ? container(component) : component;
    return !setShow ? 
            <Route path={`${match.path}/${path}`}>
                    <Dialog open onClose={handleClose} fullWidth maxWidth='sm'>
                        <DialogTitle>{title}</DialogTitle>
                        <Component {...props} handleClose={handleClose} />
                    </Dialog>
            </Route>
        :
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>{title}</DialogTitle>
            <Component {...props} handleClose={handleClose} />
        </Dialog>
}