import React from 'react';
import './Routes.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { HelloLock } from './pages/HelloLock';

export const Routes: React.FC = () => {
  return <BrowserRouter>
    <div>
      <header>
        <div>
          <Link to="/">home</Link>
        </div>
        <div>
          <Link to="/register">register</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
        <div>
          <Link to="/helloLock">hello Lock</Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/helloLock" component={HelloLock} />
      </Switch>
    </div>
  </BrowserRouter>
};
