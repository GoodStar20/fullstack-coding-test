import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Text } from "@chakra-ui/react";

const DynamicText = forwardRef((props, ref) => {
  const [value, setValue] = useState("Random Text");
  useImperativeHandle(ref, () => ({
    changeValue(newValue) {
      setValue(newValue);
    },
  }));

  return (
    <Text fontSize="3xl" w="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
      {value}
    </Text>
  );
});

export default DynamicText;
