// markdown编辑器的类型声明
declare namespace toastui {
    class Editor {
        constructor(options: any);
        getMarkdown: () => string;
        on: (event: string, callback: Function) => void;
        getHTML: () => string;
        removeHook: (type: string) => void;
        addHook: (type: string, handler: Function) => void;
        setHeight: (height: string) => void;
        focus: () => void;
    }
}