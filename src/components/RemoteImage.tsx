import { ActivityIndicator, Image, ImageProps } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { useImage } from "../api";
import Animated, { AnimatedProps } from "react-native-reanimated";
const fallback = require("../../assets/images/fallback.png");

type RemoteImageProps = AnimatedProps<ImageProps> & {
  path?: string | undefined;
  profile?: boolean;
};

const RemoteImage = ({
  style,
  path,
  profile,
  ...imageProps
}: RemoteImageProps) => {
  //   const { data: image } = useImage(path, profile);
  const image = false;

  return (
    <Animated.Image
      style={style}
      source={image ? { uri: image } : fallback}
      {...imageProps}
    />
  );
};

export default RemoteImage;
