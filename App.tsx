import { compose } from "recompose";

import ExampleComponent from "./src/components/ExampleComponent/ExampleComponent";
import withReactQuery from "./src/hocs/react-query";

const App = () => <ExampleComponent />;

export default compose(withReactQuery)(App);
