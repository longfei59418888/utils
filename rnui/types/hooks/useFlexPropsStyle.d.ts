import { ViewProps } from 'react-native';
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable';
import { FlexStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
/**
 * 即时读取缩放比(命令式)。基于当前 window 宽度计算,旋转/分屏后再次调用即为最新值。
 * 非响应式:在渲染期调用不会随窗口变化自动重渲染,响应式场景请用 useScale()。
 */
export declare const getScale: () => number;
export declare const viewProps: readonly ["borderBottomWidth", "borderEndWidth", "borderLeftWidth", "borderRightWidth", "borderStartWidth", "borderTopWidth", "borderWidth", "bottom", "rowGap", "gap", "columnGap", "height", "left", "margin", "marginBottom", "marginEnd", "marginHorizontal", "marginLeft", "marginRight", "marginStart", "marginTop", "marginVertical", "maxHeight", "maxWidth", "minHeight", "minWidth", "padding", "paddingBottom", "paddingEnd", "paddingHorizontal", "paddingLeft", "paddingRight", "paddingStart", "paddingTop", "right", "start", "top", "width"];
export type FlexStyleProps = (typeof viewProps)[number];
export declare const setDesignWidth: (width: number) => void;
/**
 * 响应式缩放比:随窗口宽度(旋转/折叠屏/分屏)变化自动更新。
 */
export declare const useScale: () => number;
export declare const viewPropsBooleans: {
    alignContentFlexStart: {
        alignContent: string;
    };
    alignContentFlexEnd: {
        alignContent: string;
    };
    alignContentCenter: {
        alignContent: string;
    };
    alignContentStretch: {
        alignContent: string;
    };
    alignContentSpaceBetween: {
        alignContent: string;
    };
    alignContentSpaceAround: {
        alignContent: string;
    };
    alignContentSpaceEvenly: {
        alignContent: string;
    };
    alignItemsFlexStart: {
        alignItems: string;
    };
    alignItemsFlexEnd: {
        alignItems: string;
    };
    alignItemsCenter: {
        alignItems: string;
    };
    alignItemsStretch: {
        alignItems: string;
    };
    alignItemsBaseline: {
        alignItems: string;
    };
    alignSelfFlexStart: {
        alignSelf: string;
    };
    alignSelfFlexEnd: {
        alignSelf: string;
    };
    alignSelfCenter: {
        alignSelf: string;
    };
    alignSelfStretch: {
        alignSelf: string;
    };
    alignSelfBaseline: {
        alignSelf: string;
    };
    boxSizingBorderBox: {
        boxSizing: string;
    };
    boxSizingContentBox: {
        boxSizing: string;
    };
    directionInherit: {
        direction: string;
    };
    directionLtr: {
        direction: string;
    };
    directionRtl: {
        direction: string;
    };
    displayNone: {
        display: string;
    };
    displayFlex: {
        display: string;
    };
    displayContents: {
        display: string;
    };
    flexDirectionRow: {
        flexDirection: string;
    };
    flexDirectionColumn: {
        flexDirection: string;
    };
    flexDirectionRowReverse: {
        flexDirection: string;
    };
    flexDirectionColumnReverse: {
        flexDirection: string;
    };
    flexWrap: {
        flexWrap: string;
    };
    flexNoWrap: {
        flexWrap: string;
    };
    flexWrapReverse: {
        flexWrap: string;
    };
    isolationAuto: {
        isolation: string;
    };
    isolationIsolate: {
        isolation: string;
    };
    justifyContentFlexStart: {
        justifyContent: string;
    };
    justifyContentFlexEnd: {
        justifyContent: string;
    };
    justifyContentCenter: {
        justifyContent: string;
    };
    justifyContentSpaceBetween: {
        justifyContent: string;
    };
    justifyContentSpaceAround: {
        justifyContent: string;
    };
    justifyContentSpaceEvenly: {
        justifyContent: string;
    };
    overflowVisible: {
        overflow: string;
    };
    overflowHidden: {
        overflow: string;
    };
    overflowScroll: {
        overflow: string;
    };
    absolute: {
        position: string;
    };
    relative: {
        position: string;
    };
    static: {
        position: string;
    };
};
export type FlexValue = keyof typeof viewPropsBooleans;
export type ViewExtendProps<T = object> = ViewProps & Partial<Record<FlexValue, boolean>> & Pick<FlexStyle, FlexStyleProps> & {
    zIndex?: number;
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderColor?: string;
    opacity?: number;
    backgroundColor?: string;
    flex?: true | number;
    widthFull?: boolean;
    heightFull?: boolean;
    center?: boolean;
} & T;
export type ViewExtendPropsWithPress<T = object> = ViewExtendProps<{
    onPress?: PressableProps['onPress'];
    touchableOpacity?: boolean;
    touchableScale?: boolean;
    onLongPress?: PressableProps['onLongPress'];
}> & T;
export declare const scaleStyle: <T extends Record<string, unknown>>(rest: T, attrs?: string[]) => T;
export declare const scale: (value: number) => number;
export declare const useFlexPropsStyle: <V = ViewProps, F = FlexStyle>({ flex, zIndex, borderRadius, opacity, borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius, borderColor, widthFull, heightFull, backgroundColor, center, ...rest }: ViewExtendProps) => {
    flexStyle: F;
    props: V;
};
