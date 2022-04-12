import React, { Suspense, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Loading from './components/animations/Loading';
import AppNav from './components/nav/AppNav';
import StoreProvider, { store } from './store';

const Modules = React.lazy(() => import('./components/nav/Modules'));

function Main() {
  const { dispatch } = useContext(store);
  function initialize() {
    const payload = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)
      const item = localStorage.getItem(key);
      if (key === 'favoriteCharacters' || key === 'favoriteComics') {
        payload[key] = JSON.parse(item);
      }
    }
    dispatch({ actionType: 'INITIALIZE', payload });
  }
  useEffect(() => {
    initialize();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route path="/:module">
            <nav className="app-header">
              <AppNav />
            </nav>
            <Modules />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Main />
      </StoreProvider>
    </div>
  );
}

export default App;
