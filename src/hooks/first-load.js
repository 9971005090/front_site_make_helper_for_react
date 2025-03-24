// src/hooks/first-load.js
import { useSelector, useDispatch } from 'react-redux';
import { _selectIsDone, _setIsDone } from '../redux/slice/first-load';

const useFirstLoad = function() {
    const isDone = useSelector(_selectIsDone);
    const dispatch = useDispatch();

    const setIsDone = (isDone) => {
        dispatch(_setIsDone(isDone));
    };

    return { isDone, setIsDone };
};

export { useFirstLoad };
