import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;
const ICON_SIZE = 25;

export default function IconButton({
  onPress,
  androidName,
  containerStyle,
}) {
  return (
    <TouchableOpacity
      onPress= {onPress}
      activeOpacity= {0.5}
      style= {[
        {
          backgroundColor: '#00000050',
          padding: CONTAINER_PADDING,
          borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
          width: CONTAINER_WIDTH,
        },
        containerStyle,
      ]}
    >
      <Ionicons
        size= {ICON_SIZE}
        name= {androidName}
        style= {{}}
        color= {'white'}
      />
    </TouchableOpacity>
  );
}