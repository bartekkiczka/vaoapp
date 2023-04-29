import { Routes, Route } from 'react-router';
import './App.scss';
import { RoutingPaths } from '../helpers/RoutingPaths';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route path={RoutingPaths.DASHBOARD} element={<Dashboard />} />
      <Route path={RoutingPaths.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default App;
