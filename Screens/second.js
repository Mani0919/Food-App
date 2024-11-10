import { StyleSheet, Text, View, Button } from 'react-native';

export default function Second ({ navigation, route }) {
    // const {name}=route.params
  return (
    <View style={styles.container}>
      <Text >
       About
      </Text>
      <Button title=' Go Back to Home' onPress={() => navigation.navigate('Home')}/>
      {/* <Button title='Update' onPress={()=>navigation.setParams({
        name:"manikanta tangudu"
      })}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
