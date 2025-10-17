import { FC } from "react";

interface IconProps {
  name: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  viewBox?: string;
  preserveAspectRatio?: string;
}


const Icon:FC <IconProps> = ({ name, width, height, className, viewBox, preserveAspectRatio = "xMidYMid meet" }) => {

  const href = `/icons/svg-sprite.svg#${name}`;

  return  (<svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox || "0 0 32 32"}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href={href} xlinkHref={href} />
    </svg>)
};

export default Icon;
