import { ViewExtendProps } from '../hooks/useFlexPropsStyle';
import { ImageProps, ImageResizeMode, StatusBarProps, StatusBarStyle } from 'react-native';
import { Edge } from 'react-native-safe-area-context';
type ScreenProps = ViewExtendProps & {
    safeAreaEdges?: Array<Edge>;
    barStyle?: null | StatusBarStyle | undefined;
    source?: ImageProps['source'];
    statusBarProps?: StatusBarProps;
    resizeMode?: ImageResizeMode;
};
export declare const Screen: import("react").NamedExoticComponent<ScreenProps>;
export default Screen;
