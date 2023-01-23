import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ExampleComponent: React.FC = () => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    {/* eslint-disable-next-line react/style-prop-object */}
    <StatusBar style="auto" />
  </View>
);

export default ExampleComponent;
