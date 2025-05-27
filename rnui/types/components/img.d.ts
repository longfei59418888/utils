import { ViewExtendPropsWithPress } from '../hooks/useFlexPropsStyle';
import { FC } from 'react';
import { ImageStyle, ImageResizeMode, ImageProps } from 'react-native';
type sizeType = number | `${number}%`;
export declare const Img: FC<ViewExtendPropsWithPress<{
    source: ImageProps['source'];
    resizeMode?: ImageResizeMode;
    size?: sizeType;
    style?: ImageStyle;
}>>;
export default Img;
