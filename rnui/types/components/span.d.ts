import { ViewExtendProps } from '../hooks/useFlexPropsStyle';
import { ReactNode } from 'react';
import { StyleProp, TextProps as RNTextProps, TextStyle } from 'react-native';
export interface TextProps extends RNTextProps {
    text?: string;
    fontFamily?: string;
    style?: StyleProp<TextStyle>;
    color?: string;
    lineHeight?: number;
    size?: number;
    children?: ReactNode;
}
export declare const Span: import("react").NamedExoticComponent<Omit<ViewExtendProps, "style"> & TextProps & Partial<Record<"textAlignLeft" | "textAlignRight" | "textAlignCenter" | "textAlignJustify", boolean>>>;
export default Span;
