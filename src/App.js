import { Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <Switch >
      <Route exact path='/' component={HomePage} />
    </Switch>
  );
}

export default App;
