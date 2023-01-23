import { NativeBaseProvider } from "native-base";

import { ReactHoc } from "../types/hocs";

const withNativeBase: ReactHoc = (Component) =>
  function (props) {
    return (
      <NativeBaseProvider>
        <Component {...props} />
      </NativeBaseProvider>
    );
  };

export default withNativeBase;
