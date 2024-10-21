import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default BottomRowTools = ({
  cameraMode,
  setCameraMode,
}) => {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity 
          style= {{
            paddingHorizontal: 10,
            borderRadius: 20,
            paddingVertical: 5,
            borderColor: 'white',
            borderWidth: 1,
            backgroundColor: cameraMode === 'picture' ? 'white' : 'rgba(255, 255, 255, 0)',
          }}
          onPress={() => setCameraMode('picture')}
        >
          <Text
            style= {{
              fontWeight: 'bold',
              color: cameraMode === 'picture' ? 'black' : 'white'
            }}
          >
            Foto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style= {{
            paddingHorizontal: 10,
            borderRadius: 20,
            paddingVertical: 5,
            borderColor: 'white',
            borderWidth: 1,
            backgroundColor: cameraMode === 'video' ? 'white' : 'rgba(255, 255, 255, 0)',
          }}
          onPress={() => setCameraMode('video')}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: cameraMode === 'video' ? 'black' : 'white'
            }}
          >
            Video
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    left: '36%'
  },
});