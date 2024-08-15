interface CssRules {
    key: string;
    value: string;
    text: string;
}
interface Block {
    index: number;
    text: string;
    parent: Block | null;
    cssRules?: CssRules[];
    block?: Block[];
}
interface Style {
    name: string;
    values: string[];
}
interface FileStyles {
    fileName: string;
    styles: Style[];
}
export interface StyleSameConfig {
    styles: string[];
    cssRules: {
        [key in string]: true | string[];
    };
}
export declare const removeTemplate: (raws: string) => Block;
export declare const initStyles: (stylePaths: string[]) => {};
export declare const getBlockErrors: (styles: FileStyles[], roots: Block) => string[];
export declare const getErrorRulesInCss: (presetCssRules: StyleSameConfig['cssRules'], root: Block) => string[];
export {};
