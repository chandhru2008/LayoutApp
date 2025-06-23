import { getStrokeStyle } from "../../../utils/strokeStyleUtil";

const Triangle = ({
  width = 100,
  height = 100,
  fill = '',
  stroke = '#1e3a8a',
  strokeWidth = 1,
  className = '',
  strokeStyle = ''
}) => {

  const padding = 15;

  const pathD = `M ${width / 2} ${padding}
                 L ${width - padding} ${height - padding}
                 L ${padding} ${height - padding}
                 Z`;

  return (
    <svg
      width={width-10}
      height={height-10}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={getStrokeStyle(strokeStyle, strokeWidth)}
        strokeLinecap={strokeStyle == "dotted" ? 'round' : 'square'}
      />
    </svg>
  );
};

export default Triangle