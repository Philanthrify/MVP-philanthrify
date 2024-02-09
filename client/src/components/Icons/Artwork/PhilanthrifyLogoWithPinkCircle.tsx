import PhilanthrifyLogo from "../PhilanthrifyLogo";


const PhilanthrifyLogoWithPinkCircle = () => {
  const color = "#CE8AF8";
  const logoSize = 60;
  const centerX = 16 + logoSize / 2;
  const centerY = 17 + logoSize / 2;

  
  return (

    <svg width="164.05" height="164.05" viewBox="0 0 100 110"  >
      <defs>
        <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#CE8AF8" />
        </filter>
      </defs>
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
