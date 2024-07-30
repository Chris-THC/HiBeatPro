import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

export const RecientlyAlbumLoader = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      style={{marginLeft: 8}}
      width={560}
      height={530}
      viewBox="0 0 550 500"
      backgroundColor="#222227"
      foregroundColor="#5a5a64"
      {...props}>
      <Rect x="3" y="55" rx="9" ry="9" width="122" height="142" />
      <Rect x="5" y="3" rx="5" ry="5" width="207" height="37" />
      <Rect x="328" y="21" rx="0" ry="0" width="1" height="1" />
      <Rect x="134" y="56" rx="9" ry="9" width="122" height="142" />
      <Rect x="263" y="56" rx="9" ry="9" width="122" height="142" />
      <Rect x="3" y="212" rx="9" ry="9" width="122" height="142" />
      <Rect x="134" y="213" rx="9" ry="9" width="122" height="142" />
      <Rect x="263" y="213" rx="9" ry="9" width="122" height="142" />
      <Rect x="3" y="365" rx="9" ry="9" width="122" height="142" />
      <Rect x="134" y="366" rx="9" ry="9" width="122" height="142" />
      <Rect x="263" y="366" rx="9" ry="9" width="122" height="142" />
    </ContentLoader>
  );
};
