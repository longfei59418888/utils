import { ImageProps, ImageResizeMode, LayoutChangeEvent, ViewStyle } from 'react-native';
import { ViewExtendProps } from '../hooks/useFlexPropsStyle';
import { FC } from 'react';
export declare const Background: FC<ViewExtendProps<{
    source: ImageProps['source'];
    resizeMode?: ImageResizeMode;
    style?: ViewStyle;
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}>>;
export default Background;
