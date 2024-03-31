import './App.css';
import Search from './components/Search';
import SearchList from './components/SearchList';

function App() {
  return (
    <div className='container'>
      <div className='search'>
        <Search />
        <SearchList />
      </div>
    </div>
  );
}

export default App;
