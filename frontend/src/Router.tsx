import { Route, Routes } from 'react-router-dom';
import { Auth } from './Auth';
import { Login } from './components/Login';
import { Main } from './components/Main';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Authコンテンツ */}
      {/* prettier-ignore */}
      <Route path="/main" element={<Auth><Main /></Auth>} />
    </Routes>
  );
};
