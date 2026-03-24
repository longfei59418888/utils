import { FlexStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { ViewProps } from 'react-native';
import { PressableProps } from 'react-native/Libraries/Components/Pressable/Pressable';
export declare const getScale: () => number;
export declare const viewProps: readonly ["borderBottomWidth", "borderEndWidth", "borderLeftWidth", "borderRightWidth", "borderStartWidth", "borderTopWidth", "borderWidth", "bottom", "rowGap", "gap", "columnGap", "height", "left", "margin", "marginBottom", "marginEnd", "marginHorizontal", "marginLeft", "marginRight", "marginStart", "marginTop", "marginVertical", "maxHeight", "maxWidth", "minHeight", "minWidth", "padding", "paddingBottom", "paddingEnd", "paddingHorizontal", "paddingLeft", "paddingRight", "paddingStart", "paddingTop", "right", "start", "top", "width"];
export type FlexStyleProps = (typeof viewProps)[number];
export declare const setDesignWidth: (width: number) => void;
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
    alignSelfFlexStart: {
        alignSelf: string;
    };
    alignItemsFlexEnd: {
        alignItems: string;
    };
    alignSelfFlexEnd: {
        alignSelf: string;
    };
    alignItemsCenter: {
        alignItems: string;
    };
    alignSelfCenter: {
        alignSelf: string;
    };
    alignItemsStretch: {
        alignItems: string;
    };
    alignSelfStretch: {
        alignSelf: string;
    };
    alignItemsBaseline: {
        alignItems: string;
    };
    alignSelfBaseline: {
        alignSelf: string;
    };
    displayNone: {
        display: string;
    };
    displayFlex: {
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
    flex?: true | number;
    zIndex?: number;
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderColor?: string;
    widthFull?: boolean;
    opacity?: number;
    backgroundColor?: string;
    heightFull?: boolean;
    center?: boolean;
} & T;
export type ViewExtendPropsWithPress<T = object> = ViewExtendProps<{
    onPress?: PressableProps['onPress'];
    touchableOpacity?: boolean;
    touchableScale?: boolean;
    onLongPress?: PressableProps['onLongPress'];
}> & T;
export declare const scaleStyle: <T = FlexStyle>(rest: T, attrs?: string[]) => T;
export declare const scale: (value: number) => number;
export declare const useFlexPropsStyle: <V = ViewProps, F = FlexStyle>({ flex, zIndex, borderRadius, opacity, borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius, borderColor, widthFull, heightFull, backgroundColor, center: centerProps, ...rest }: ViewExtendProps) => {
    flexStyle: F;
    props: V;
};
