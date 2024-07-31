import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

export const PlayListLoader = (props: any) => (
  <ContentLoader
    style={{marginTop: 20, marginHorizontal: 8}}
    speed={2}
    width={550}
    height={260}
    viewBox="0 0 550 250"
    backgroundColor="#222227"
    foregroundColor="#5a5a64"
    {...props}>
    <Rect x="3" y="55" rx="9" ry="9" width="137" height="165" />
    <Rect x="3" y="3" rx="5" ry="5" width="207" height="37" />
    <Rect x="328" y="21" rx="0" ry="0" width="1" height="1" />
    <Rect x="149" y="56" rx="9" ry="9" width="137" height="165" />
    <Rect x="295" y="55" rx="9" ry="9" width="137" height="165" />
  </ContentLoader>
);
