import PhilanthrifyLogo from "../PhilanthrifyLogo";

const PhilanthrifyLogoWithPinkCircle = () => {
  const color = "#CE8AF8";
  const logoSize = 65;
  const centerX = 16 + logoSize / 2;
  const centerY = 16 + logoSize / 2;
  return (
    <svg width="164.05" height="164.05" viewBox="0 0 100 110">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill={color}
        stroke={color}
        strokeWidth="4"
      />{" "}
      <foreignObject
        x="20"
        y="20"
        width={logoSize}
        height={logoSize}
        transform={`rotate(45, ${centerX}, ${centerY})`}
      >
        <PhilanthrifyLogo width="100%" height="100%" />
      </foreignObject>
    </svg>
  );
};

export default PhilanthrifyLogoWithPinkCircle;
