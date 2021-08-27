import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Loading from './components/animations/Loading';
import AppNav from './components/nav/AppNav';

const Module = React.lazy(() => import('./components/nav/Module'));

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
