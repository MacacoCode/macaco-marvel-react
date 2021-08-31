import React, { Suspense, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Loading from './components/animations/Loading';
import AppNav from './components/nav/AppNav';
import StoreProvider, { store } from './store';

const Module = React.lazy(() => import('./components/nav/Module'));

function Main() {
  const { dispatch } = useContext(store);

  function getItemsFromLocal(){
    let temp = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      temp.push(localStorage.getItem(localStorage.key(i)));
    }
    dispatch({actionType: 'INITIALIZE', payload: temp});
}
  useEffect(() => {
    getItemsFromLocal();
  }, [])
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route path="/:module">
            <nav className="app-header">
              <AppNav />
            </nav>
            <Module />
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
