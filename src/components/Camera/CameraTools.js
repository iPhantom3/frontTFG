import { View } from 'react-native';
import IconButton from './IconButton';

export default CameraTools = ({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
  cameraMode
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        right: 6,
        zIndex: 1,
        gap: 16,
      }}
    >
      <IconButton
        onPress= {() => setCameraTorch((prevValue) => !prevValue)}
        androidName= {
          cameraTorch ? 'flashlight' : 'flashlight-outline'
        }
      />
      {
        cameraMode === 'picture' ? (
          <IconButton
            onPress={() =>
              setCameraFacing((prevValue) =>
                prevValue === 'back' ? 'front' : 'back'
              )
            }
          androidName= 'camera-reverse-outline'
        />
        ) : ''
      }
      <IconButton
        onPress= {() =>
          setCameraFlash((prevValue) => (prevValue === 'off' ? 'on' : 'off'))
        }
        androidName= {cameraFlash === 'on' ? 'flash' : 'flash-off'}
      />
      <IconButton
        onPress= {() => {}}
        androidName= 'volume-high'
      />
      <IconButton
        onPress= {() => {
          // increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.10);
          }
        }}
        androidName= 'add-circle'
      />
      <IconButton
        onPress= {() => {
          // decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.10);
          }
        }}
        androidName= 'remove-circle'
      />
    </View>
  );
}