import React from "react";
import {
  Avatar as RNEAvatar,
  AvatarProps as RNEAvatarProps,
} from "@rneui/themed";

export type AvatarProps = RNEAvatarProps;

export const Avatar: React.FC<AvatarProps> = (props) => {
  return <RNEAvatar rounded size="medium" {...props} />;
};
