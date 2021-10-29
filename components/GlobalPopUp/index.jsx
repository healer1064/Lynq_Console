import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'js-cookie'
import CloseIcon from '@material-ui/icons/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& h2, & button': {
    fontWeight: '700',
    '& button': {
      float: 'right'
    }
  },
  '& button.mainButton': {
    background: theme.palette.primary.main,
    color: '#fff',
    minWidth: '200px',
    margin: '10px auto'
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon className='closeButton' />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function GlobalPopUp({ content }) {
  const [open, setOpen] = React.useState(content.opened);

  const handleClose = () => {
    Cookies.set(content.cookieName, 'true', {
      path: '/',
    });
    if (typeof window !== 'undefined') window.open(content.link);
    setOpen(false);
  };

  const handleCloseButton = () => {
    setOpen(false);
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleCloseButton}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
          {content.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={{__html: content.content}} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className='mainButton'>
            {content.linkText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}