import { View } from 'react-native';
import IconButton from './IconButton';

export default CloseCameraButton = ({
  setCameraVisible,
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 10,
        left: 6,
        zIndex: 1,
        gap: 16,
      }}
    >
      <IconButton
        onPress= {() => {
          setCameraVisible((prevValue) => !prevValue);
        }}
        androidName= 'close'
      />
    </View>
  );
}