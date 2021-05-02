import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      className="md-block"
      speed={2}
      width={400}
      height={500}
      viewBox="0 0 400 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"

    >
      <rect x="0" y="60" rx="2" ry="2" width="300" height="250" />
      <rect x="6" y="331" rx="0" ry="0" width="295" height="50" />
      <rect x="12" y="410" rx="6" ry="6" width="113" height="42" />
      <rect x="156" y="409" rx="27" ry="27" width="145" height="45" />
    </ContentLoader>
  );
}

export default LoadingBlock;
