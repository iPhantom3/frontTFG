import axios from 'axios';
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from 'react-native';

console.log('Stage: ', STAGE)
console.log('apiurl: ', PROD_URL)
console.log('apiurl ios: ', API_URL_IOS)
console.log('apiurl android: ', API_URL_ANDROID)

const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
    ? API_URL_IOS
    : API_URL_ANDROID;

const appApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export { appApi };
