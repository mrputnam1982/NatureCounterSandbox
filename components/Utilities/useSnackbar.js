import { useDispatch } from "react-redux";
import { hideSnackbar, showSnackbar } from "../../redux/actions/snackbarActions";

const useSnackbar = () => {
    const dispatch = useDispatch();

    return message => {
        dispatch(showSnackbar(message));
        setTimeout(() => dispatch(hideSnackbar()), 3000);
    };
};

export default useSnackbar;