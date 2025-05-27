import { ViewExtendProps } from '../hooks/useFlexPropsStyle';
import { FC } from 'react';
import { ImageProps, StatusBarProps, StatusBarStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';
export declare const Screen: FC<ViewExtendProps & {
    safeAreaEdges?: Array<Edge>;
    barStyle?: null | StatusBarStyle | undefined;
    source: ImageProps['source'];
    statusBarProps?: StatusBarProps;
    onPress?: () => void;
}>;
export default Screen;
