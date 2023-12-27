export declare const getProgressBar: (message: string, callback?: (() => void) | false, type?: boolean, outTime?: number, total?: number) => {
    end: (type?: boolean) => void;
};
export declare const exit: (...messages: string[]) => never;
