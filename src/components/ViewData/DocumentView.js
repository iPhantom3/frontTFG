import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DocumentIcon from './DocumentIcon';

export default DocumentView = ({files}) => {
  return (
    <View style={styles.filesSubContainer}>
      {
        files.map((file,index)=> (
          <DocumentIcon
            key={index}
            file={file}
          />
        ))
      }
    </View>
  )
}


const styles = StyleSheet.create({
  filesSubContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 5,
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
})