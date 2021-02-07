import React from 'react';
import { Link as MaterialLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const Link = props => (
    <MaterialLink component={RouterLink} {...props} />
)