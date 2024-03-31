import { useDispatch } from 'react-redux';
import { changeSearchField } from '../redux/actions/actionCreators';

function Search() {
    const dispatch = useDispatch();

    const onValueChange = (e) => {
        const { value } = e.target;
        dispatch(changeSearchField(value));
    }

    return (
        <input className='input' type='text' placeholder='Найти...' onChange={onValueChange} />
    );
}

export default Search;