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

// 富文本编辑器wangEditor的类型声明
declare class wangEditor {
    constructor(el: string);
    create: () => void;
    config: { [key: string]: any };
    txt: { [key: string]: any };
}