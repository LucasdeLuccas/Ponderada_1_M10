import React from "react";
import { Input as RNEInput, InputProps as RNEInputProps } from "@rneui/themed";

export type InputProps = RNEInputProps;

export const Input: React.FC<InputProps> = (props) => {
  return (
    <RNEInput
      inputStyle={{ fontSize: 16 }}
      containerStyle={{ marginBottom: 12 }}
      {...props}
    />
  );
};
