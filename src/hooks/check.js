// src/hooks/check.js
import { useSelector, useDispatch } from 'react-redux';
import { _selectIsUrlChange, _selectIsNavigateChange, _setUrlChange, _setNavigateChange } from '../redux/slice/check';

export const useCheck = () => {
    const isUrlChange = useSelector(_selectIsUrlChange);
    const isNavigateChange = useSelector(_selectIsNavigateChange);
    const dispatch = useDispatch();

    const setUrlChange = (value) => {
        dispatch(_setUrlChange(value));
    };

    const setNavigateChange = (value) => {
        dispatch(_setNavigateChange(value));
    };

    return { isUrlChange, isNavigateChange, setUrlChange, setNavigateChange };
};
