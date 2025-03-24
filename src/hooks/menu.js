// src/hooks/menu.js
import { useSelector, useDispatch } from 'react-redux';
import { _selectIsHeaderChange, _selectIsLeftChange, _setHeaderChange, _setLeftChange } from '../redux/slice/menu';

export const menuAuth = function() {
    const isHeaderChange = useSelector(_selectIsHeaderChange);
    const isLeftChange = useSelector(_selectIsLeftChange);
    const dispatch = useDispatch();

    const setHeaderChange = function() {
        dispatch(_setHeaderChange());
    };
    const setLeftChange = function() {
        dispatch(_setLeftChange());
    };

    return { isHeaderChange, isLeftChange, setHeaderChange, setLeftChange };
};
