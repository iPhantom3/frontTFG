import { 
  FIREBASE_API_KEY, 
  FIREBASE_APP_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_PROJECTID, 
  FIREBASE_APP_AUTHDOMAIN
 } from '@env';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  appId: FIREBASE_APP_ID,
  authDomain: FIREBASE_APP_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
};

if( getApps().length === 0){
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage(fbApp);

const getPathStorageFromUri = (uri) => {

  const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/prueba-tft.appspot.com/o/';

  let imagePath = uri.replace(baseUrl, '');

  const indexOfEndPath = imagePath.indexOf('?');

  imagePath = imagePath.substring(0,indexOfEndPath);
  imagePath = imagePath.replace('%2F','/');

  return imagePath;
}

const uploadFileToFirebase = async (uri, name, folder) => {
  try{
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const storageRef = ref(getStorage(), `${folder}/${name}`);

    const result = await uploadBytes(storageRef, theBlob);

    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL;

  } catch (error) {
    console.log('Error in uploadFileToFirebase: ', error)
  }
  
};

const deleteFileOfFirebase = async (uri) => {
  try {
    const filePath = getPathStorageFromUri(uri);

    const fileRef = ref(getStorage(), filePath);

    await deleteObject(fileRef).then( () => {})
    .catch( () => {
      console.log('Error al eliminar archivo');
    });

  } catch (error) {
    console.log('Error in deleteFileOfFirebase: ', error)
  }
}
export { fbApp, fbStorage, uploadFileToFirebase, deleteFileOfFirebase }