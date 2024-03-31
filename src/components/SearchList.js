import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearItems } from '../redux/actions/actionCreators';

function SearchList() {
    const { items, isLoading, error, search } = useSelector(state => state.search);
    const dispatch = useDispatch();

    const hasQuery = search.trim() !== '';

    useEffect(() => {
        search.trim() === '' && dispatch(clearItems());
    }, [search, dispatch]);

    return (
        <>
            {!hasQuery && <span>Type something to search</span>}
            {hasQuery && isLoading && <span>Searching...</span>}
            {error ? <span>Error occured</span> : <ul>{items.map(
                item => <li key={item.id}>{item.name}</li>
            )}</ul>}
        </>
    );
}

export default SearchList;