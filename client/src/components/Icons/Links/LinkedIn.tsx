import React from "react";

interface LinkedInProps {
  webLink: string;
}

const LinkedIn: React.FC<LinkedInProps> = ({ webLink }) => {
  return (
    <a
      href={webLink}
      className="social-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <rect
          x="1.25"
          y="1.25"
          width="17.5"
          height="17.5"
          rx="8.75"
          fill="#1275B1"
        />
        <path
          d="M7.8866 6.05759C7.8866 6.64169 7.38032 7.11519 6.7558 7.11519C6.13128 7.11519 5.625 6.64169 5.625 6.05759C5.625 5.4735 6.13128 5 6.7558 5C7.38032 5 7.8866 5.4735 7.8866 6.05759Z"
          fill="white"
        />
        <path
          d="M5.77964 7.89256H7.71263V13.75H5.77964V7.89256Z"
          fill="white"
        />
        <path
          d="M10.8247 7.89256H8.89175V13.75H10.8247C10.8247 13.75 10.8247 11.906 10.8247 10.753C10.8247 10.061 11.061 9.36596 12.0039 9.36596C13.0694 9.36596 13.063 10.2716 13.058 10.9732C13.0515 11.8903 13.067 12.8262 13.067 13.75H15V10.6586C14.9836 8.68461 14.4693 7.77505 12.7771 7.77505C11.7721 7.77505 11.1492 8.23129 10.8247 8.64406V7.89256Z"
          fill="white"
        />
      </svg>{" "}
    </a>
  );
};

export default LinkedIn;
