import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';


export default MainRowActions = ({
  cameraMode,
  handleTakePicture,
  isRecording,
}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style= {styles.buttonContainer}
      onPress={handleTakePicture}
      >
        <Ionicons
          size= {30}
          name= {cameraMode === 'picture'
            ? 'camera'
            : isRecording
            ? 'stop'
            : 'videocam'}
          color= {isRecording ? 'red' : 'white'}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    position: 'absolute',
    zIndex: 1,
    bottom: 45,
  },
  buttonContainer: {
    padding: 7,
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 50
  }
});