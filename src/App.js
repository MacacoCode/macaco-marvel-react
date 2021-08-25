import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import AppNav from './components/nav/AppNav';

const HomePage =  React.lazy(() => import('./pages/HomePage'));
const CharactersPage =  React.lazy(() => import('./pages/CharactersPage'));
const ComicsPage =  React.lazy(() => import('./pages/ComicsPage'));

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <Router>
          <AppNav />
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/characters">
              <CharactersPage />
            </Route>
            <Route path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
