import { View } from 'react-native';
import IconButton from '../Camera/IconButton';

export default CloseModalButton = ({
  setModalVisible,
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 30,
        left: 6,
        zIndex: 1,
        gap: 16,
      }}
    >
      <IconButton
        onPress= {() => {
          setModalVisible((prevValue) => !prevValue);
        }}
        androidName= 'close'
      />
    </View>
  );
}