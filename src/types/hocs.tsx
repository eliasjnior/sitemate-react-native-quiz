export interface ReactHoc {
  <P>(Component: React.ComponentType<P>): React.ComponentType<P>;
}
