import React from 'react';
import MuiAlert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PopUpAlert = ({handleClose, show, msg='', classes , error}) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return(
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleClose}
      action={action}>
        {show &&
      <Alert onClose={handleClose} severity={error? "error": "success" } sx={{ width: '100%' }}>
        {msg}
      </Alert>}
    </Snackbar>
  )
};
export default PopUpAlert;
