import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" fill="#000000" {...props}>
      <Path
        d="M17.5,0h-10C6.119,0,5,1.119,5,2.5v19C5,22.881,6.119,24,7.5,24h10c1.381,0,2.5-1.119,2.5-2.5v-19C20,1.119,18.881,0,17.5,0 z M18,22H7V2h2l1,2h5l1-2h2V22z"
        fill="#000000"
      />
    </Svg>
  );
};
