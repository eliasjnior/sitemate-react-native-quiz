import React from "react";

import { Center, Skeleton, VStack } from "native-base";

const LoadingStack: React.FC = () => (
  <Center w="100%">
    <VStack
      w="90%"
      maxW="400"
      borderWidth="1"
      space={8}
      overflow="hidden"
      rounded="md"
      _dark={{
        borderColor: "coolGray.500"
      }}
      borderColor="coolGray.200"
      mb={2}
    >
      <Skeleton h="40" />
      <Skeleton.Text px={4} mb={4} />
    </VStack>
  </Center>
);

export default LoadingStack;
