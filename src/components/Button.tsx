import React from "react";
import {
  Button as RNEButton,
  ButtonProps as RNEButtonProps,
} from "@rneui/themed";

export type ButtonProps = RNEButtonProps & {
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <RNEButton
      buttonStyle={{ borderRadius: 8, paddingVertical: 12 }}
      titleStyle={{ fontWeight: "bold", fontSize: 16 }}
      {...props}
    >
      {children}
    </RNEButton>
  );
};
