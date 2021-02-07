import { useSelector } from "react-redux"
import { selectIsLoading } from '../../redux/selectors';

export const useLoading = slice => {
    const isLoading = useSelector(selectIsLoading(slice))

    return isLoading;
}