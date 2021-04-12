import { useSelector } from "react-redux"
import { selectIsError } from '../../redux/selectors';

export const useError = slice => {
    const isError = useSelector(selectIsError(slice))

    return isError;
}