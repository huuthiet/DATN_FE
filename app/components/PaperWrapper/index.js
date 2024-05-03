/**
 *
 * PaperWrapper
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    position: 'relative',
  },
}));
function PaperWrapper(props) {
  const classes = useStyles();
  const { style = {} } = props;
  return (
    <Paper elevation={3} className={classes.paper} style={style}>
      {props.children}
    </Paper>
  );
}

PaperWrapper.propTypes = {};

export default memo(PaperWrapper);
