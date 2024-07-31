import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

export const TopArtistLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={540}
    height={163}
    viewBox="0 0 500 155"
    backgroundColor="#222227"
    foregroundColor="#5a5a64"
    {...props}>
    <Rect x="3" y="55" rx="9" ry="9" width="137" height="73" />
    <Rect x="3" y="3" rx="5" ry="5" width="207" height="37" />
    <Rect x="328" y="21" rx="0" ry="0" width="1" height="1" />
    <Rect x="150" y="55" rx="9" ry="9" width="137" height="73" />
    <Rect x="297" y="54" rx="9" ry="9" width="137" height="73" />
  </ContentLoader>
);
