import { SafeAreaView } from "react-native";

import { compose } from "recompose";

import SearchForm from "./src/components/SearchForm/SearchForm";
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

export default compose(withReactQuery)(App);
