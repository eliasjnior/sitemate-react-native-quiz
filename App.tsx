import { SafeAreaView } from "react-native";

import { compose } from "recompose";

import SearchForm from "./src/components/SearchPage/SearchPage";
import withNativeBase from "./src/hocs/native-base";
import withReactQuery from "./src/hocs/react-query";

const App = () => (
  <SafeAreaView
    style={{
      flex: 1
    }}
  >
    <SearchForm />
  </SafeAreaView>
);

export default compose(withNativeBase, withReactQuery)(App);
