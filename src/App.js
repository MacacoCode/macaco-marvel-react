import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Loading from './components/animations/Loading';
import AppNav from './components/nav/AppNav';
import StoreProvider from './store';

const Modules = React.lazy(() => import('./components/nav/Modules'));

function Main() {
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
