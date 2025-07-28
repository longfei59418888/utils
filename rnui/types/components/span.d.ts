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
export declare function Span(props: Omit<ViewExtendProps, 'style'> & TextProps & Partial<Record<`textAlign${'Left' | 'Center' | 'Justify' | 'Right'}`, boolean>>): import("react").JSX.Element;
export default Span;
