import { Button, FormControl, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncSignIn, asyncSignUp } from '../lib/auth';
import { asyncGetUserInfo } from '../lib/user';
import { AppDispatch } from '../store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { PostAuth } from '../types/auth';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// バリデーション設定
const schema = yup.object({
  username: yup.string().required('ユーザー名を入力してください'),
  password: yup.string().required('パスワードを入力してください').min(5, '5文字以上入力してください。'),
});

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { dirtyFields, isDirty, touchedFields, errors },
  } = useForm({ criteriaMode: 'all', defaultValues: { username: '', password: '' }, resolver: yupResolver(schema) });

  const login = async (data: PostAuth) => {
    if (isLoginMode) {
      await dispatch(asyncSignIn(data));
      navigate('/main');
    } else {
      await dispatch(asyncSignUp(data));
      await dispatch(asyncSignIn(data));
      await dispatch(asyncGetUserInfo());
      navigate('/main');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 h-[100vh]">
      <div className="appLogin">
        <h1 className="text-white text-center mt-7.5 mb-5 font-neue text-4xl">{isLoginMode ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit(login)}>
          <span className="text-white text-xl font-neue">Username</span>
          <TextField type="text" {...register('username')} error={'username' in errors} />
          {touchedFields.username && errors.username?.message ? (
            <div className="text-red-500 text-center m-2.5 text-sm">{errors.username.message}</div>
          ) : null}
          <span className="text-white text-xl font-neue">Password</span>
          <TextField type="password" {...register('password')} error={'password' in errors} />
          {touchedFields.password && errors.password?.message ? (
            <div className="text-red-500 text-center m-2.5 text-sm">{errors.password.message}</div>
          ) : null}
          <div className="switch">
            <Button
              variant="contained"
              color="primary"
              disabled={!dirtyFields.username || !dirtyFields.password}
              type="submit"
            >
              {isLoginMode ? 'Login' : 'Create'}
            </Button>
          </div>
          <span className="switchText" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Create Account ?' : 'Back to Login'}
          </span>
        </form>
      </div>
    </div>
  );
};
