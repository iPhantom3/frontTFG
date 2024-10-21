import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ListComponent from '../../../components/PreferenceList/ListComponent';

export default function PreferencePage() {

  return (
    <SafeAreaView style={styles.container}>
      <ListComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
