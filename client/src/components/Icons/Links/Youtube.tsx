import React from "react";

interface YoutubeProps {
  webLink: string;
}

const Youtube: React.FC<YoutubeProps> = ({ webLink }) => {
  return (
    // classname allows for hover effect since this canbe applied accross the app
    <a
      href={webLink}
      className="social-icon"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.24451 9.94111C2.37304 7.96233 3.96395 6.41157 5.94447 6.31345C8.81239 6.17136 12.9115 6 16 6C19.0885 6 23.1876 6.17136 26.0555 6.31345C28.0361 6.41157 29.627 7.96233 29.7555 9.94111C29.8786 11.8369 30 14.1697 30 16C30 17.8303 29.8786 20.1631 29.7555 22.0589C29.627 24.0377 28.0361 25.5884 26.0555 25.6866C23.1876 25.8286 19.0885 26 16 26C12.9115 26 8.81239 25.8286 5.94447 25.6866C3.96395 25.5884 2.37304 24.0377 2.24451 22.0589C2.12136 20.1631 2 17.8303 2 16C2 14.1697 2.12136 11.8369 2.24451 9.94111Z"
          fill="#FC0D1B"
        />
        <path d="M13 12V20L21 16L13 12Z" fill="white" />
      </svg>
    </a>
  );
};

export default Youtube;
