import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import NavBar from './components/NavBar';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DiscoverMoviesPage from './pages/DiscoverMoviesPage';

function App() {
  return (
    <div className="App">

    <NavBar></NavBar>

    <Switch>
      <Route path="/about" component={AboutPage} />
      <Route path="/discover" component={DiscoverMoviesPage} />
      <Route path="/" component={HomePage} />
    </Switch>

    </div>
  );
}

export default App;
