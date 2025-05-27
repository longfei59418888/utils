import { Edge } from 'react-native-safe-area-context';
export declare function useSafeAreaInsetsStyle(safeAreaEdges?: Array<Edge>, property?: 'padding' | 'margin'): {
    marginLeft: number;
    paddingLeft: number;
    marginTop: number;
    paddingTop: number;
    marginBottom: number;
    paddingBottom: number;
    marginRight: number;
    paddingRight: number;
};
export default useSafeAreaInsetsStyle;
