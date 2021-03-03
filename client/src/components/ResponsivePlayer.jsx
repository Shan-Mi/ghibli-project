import React from "react";
import ReactPlayer from "react-player";

const ResponsivePlayer = ({ trailer }) => {
  return (
    <div className="relative transform -translate-y-52  w-5/6 md:max-w-xl md:max-h-res">
      <ReactPlayer
        className="absolute left-0 top-0 w-full sm:h-full md:w-5/6 md:h-2/6 "
        url={trailer}
        width="100%"
      />
    </div>
  );
};

export default ResponsivePlayer;
