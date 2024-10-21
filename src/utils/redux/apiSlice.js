import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from 'react-native';

console.log('Stage: ', STAGE)
console.log('apiurl: ', PROD_URL)
console.log('apiurl ios: ', API_URL_IOS)
console.log('apiurl android: ', API_URL_ANDROID)


const BASE_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;
    
console.log('Base url: ', BASE_URL);

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
