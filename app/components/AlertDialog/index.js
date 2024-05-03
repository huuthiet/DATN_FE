/**
 *
 * AlertDialog
 *
 */

import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './styles.scss';

function AlertDialog(props) {
  const {
    open = false,
    alert: { title = '', content = '', callBack = () => { } },
    handleClose = () => { },
  } = props;
  const handleClick = () => {
    callBack();
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className='logout-confirm'>
          <Button onClick={handleClose} className='cancel-btn'>
            Hủy
          </Button>
          <Button onClick={handleClick}>
            Đồng ý
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  alert: PropTypes.object,
  handleClose: PropTypes.func,
};

export default memo(AlertDialog);
