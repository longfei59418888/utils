import { FC } from 'react';
import { ImageProps, ImageStyle } from 'react-native';
import { ViewExtendPropsWithPress } from '../hooks/useFlexPropsStyle';
type sizeType = number | `${number}%`;
export declare const Img: FC<ViewExtendPropsWithPress<ImageProps & {
    size?: sizeType;
    imageStyle?: ImageStyle;
}>>;
export default Img;
