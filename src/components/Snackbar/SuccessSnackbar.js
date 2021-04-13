import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { clearSnackbar } from "./actions";
import { CheckCircle, Close } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';

export default function SuccessSnackbar() {
  const dispatch = useDispatch();

  const { successSnackbarMessage, successSnackbarOpen } = useSelector(
    state => state.snackbars
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      open={successSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
    >
        <MuiAlert
            elevation={6}
            variant='filled'
            severity='success'
            onClose={handleClose}
        >
            {successSnackbarMessage}
        </MuiAlert>
    </Snackbar>
  );
}