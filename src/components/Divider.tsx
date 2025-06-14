import React from "react";
import {
  Divider as RNEDivider,
  DividerProps as RNEDividerProps,
} from "@rneui/themed";

export type DividerProps = RNEDividerProps;

export const Divider: React.FC<DividerProps> = (props) => {
  return <RNEDivider style={{ marginVertical: 8 }} {...props} />;
};
