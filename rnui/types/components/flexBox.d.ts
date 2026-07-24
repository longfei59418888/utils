import { ViewStyle } from 'react-native';
/**
 * Row / Column 的公共实现。
 * defaultStyle 放在 flexStyle 之前作为默认值,使布尔 props(如 flexDirection*)和 style 可覆盖它。
 */
export declare const FlexBox: import("react").NamedExoticComponent<import("react-native").ViewProps & Partial<Record<"absolute" | "flexWrap" | "relative" | "static" | "alignContentFlexStart" | "alignContentFlexEnd" | "alignContentCenter" | "alignContentStretch" | "alignContentSpaceBetween" | "alignContentSpaceAround" | "alignContentSpaceEvenly" | "alignItemsFlexStart" | "alignItemsFlexEnd" | "alignItemsCenter" | "alignItemsStretch" | "alignItemsBaseline" | "alignSelfFlexStart" | "alignSelfFlexEnd" | "alignSelfCenter" | "alignSelfStretch" | "alignSelfBaseline" | "boxSizingBorderBox" | "boxSizingContentBox" | "directionInherit" | "directionLtr" | "directionRtl" | "displayNone" | "displayFlex" | "displayContents" | "flexDirectionRow" | "flexDirectionColumn" | "flexDirectionRowReverse" | "flexDirectionColumnReverse" | "flexNoWrap" | "flexWrapReverse" | "isolationAuto" | "isolationIsolate" | "justifyContentFlexStart" | "justifyContentFlexEnd" | "justifyContentCenter" | "justifyContentSpaceBetween" | "justifyContentSpaceAround" | "justifyContentSpaceEvenly" | "overflowVisible" | "overflowHidden" | "overflowScroll", boolean>> & Pick<import("react-native").FlexStyle, "height" | "width" | "start" | "left" | "top" | "borderBottomWidth" | "borderLeftWidth" | "borderRightWidth" | "borderTopWidth" | "borderWidth" | "bottom" | "columnGap" | "gap" | "margin" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "padding" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "right" | "rowGap" | "borderEndWidth" | "borderStartWidth" | "marginEnd" | "marginHorizontal" | "marginStart" | "marginVertical" | "paddingEnd" | "paddingHorizontal" | "paddingStart"> & {
    zIndex?: number | undefined;
    borderRadius?: number | undefined;
    borderBottomLeftRadius?: number | undefined;
    borderBottomRightRadius?: number | undefined;
    borderTopLeftRadius?: number | undefined;
    borderTopRightRadius?: number | undefined;
    borderColor?: string | undefined;
    opacity?: number | undefined;
    backgroundColor?: string | undefined;
    flex?: number | true | undefined;
    widthFull?: boolean | undefined;
    heightFull?: boolean | undefined;
    center?: boolean | undefined;
} & {
    onPress?: ((event: import("react-native").GestureResponderEvent) => void) | null | undefined;
    touchableOpacity?: boolean | undefined;
    touchableScale?: boolean | undefined;
    onLongPress?: ((event: import("react-native").GestureResponderEvent) => void) | null | undefined;
} & object & {
    defaultStyle?: ViewStyle | undefined;
}>;
export default FlexBox;
