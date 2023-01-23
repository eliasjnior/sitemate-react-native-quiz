import { QueryClient, QueryClientProvider } from "react-query";

import { ReactHoc } from "../types/hocs";

const queryClient = new QueryClient();

const withReactQuery: ReactHoc = (Component) =>
  function (props) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    );
  };

export default withReactQuery;
