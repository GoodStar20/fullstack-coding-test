import React, { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

const DynamicText = () => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   changeValue();
  // }, [textValue]);

  return (
    <Text fontSize="3xl" w="100%" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
      {value}
    </Text>
  );
};

export default DynamicText;
