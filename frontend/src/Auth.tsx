import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { asyncLogout, asyncSignIn } from './lib/auth';
import { asyncGetUserInfo } from './lib/user';
import { loginAction, selectUser } from './slices/userSlice';
import { AppDispatch } from './store';

type Props = {
  children: ReactNode;
};

export const Auth = ({ children }: Props) => {
  const isSignedIn = useSelector(selectUser).isSignedIn;
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('Token');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isSignedIn) {
      if (token) {
        dispatch(loginAction());
        dispatch(asyncGetUserInfo());
      } else {
        navigate('/');
      }
    }
  }, [token]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};
