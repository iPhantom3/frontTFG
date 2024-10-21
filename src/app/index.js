import React from 'react';
import { useSelector } from 'react-redux';

import { Redirect } from 'expo-router';

export default index = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return userInfo != null ? (
    <Redirect href={'/(tabs)/(home)'} />
  ) : (
    <Redirect href={'/auth/signInPage'} />
  );
};