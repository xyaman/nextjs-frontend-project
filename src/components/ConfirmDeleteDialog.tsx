import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';

type ConfirmDeleteDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  title: string;
  text: string;
  okText: string;
  cancelText: string;
};


// ConfirmDeleteDialog is a simple dialog component that asks the user to confirm a delete action.
// It has two buttons, one to confirm the action and another to cancel it.
export default function ConfirmDeleteDialog(props: ConfirmDeleteDialogProps) {
  const { onConfirm, onCancel, visible, title, text, okText, cancelText } = props;

  return (
    <>
      <Dialog
        open={visible}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button onClick={onConfirm} autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

