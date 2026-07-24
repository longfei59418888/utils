import { ImageProps, ImageStyle } from 'react-native';
import { ViewExtendPropsWithPress } from '../hooks/useFlexPropsStyle';
type sizeType = number | `${number}%`;
export declare const Img: import("react").NamedExoticComponent<ViewExtendPropsWithPress<ImageProps & {
    size?: sizeType | undefined;
    imageStyle?: ImageStyle | undefined;
}>>;
export default Img;
