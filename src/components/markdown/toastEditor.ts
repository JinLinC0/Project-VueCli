import { uploadImage } from "@/api/uploadApi";

export default class {
    editor: toastui.Editor;
    constructor(el: string, initialValue: string, public height: string) {
        this.editor = new toastui.Editor({
            el: document.querySelector(el),
            initialEditType: 'markdown',
            previewStyle: 'vertical',
            height: this.height,
            initialValue: initialValue,
            hideModeSwitch: true,   // 配置底部的模式切换按钮
            toolbarItems: this.toolbar()  // 自定义工具条
        });
        this.ImageHook();
    }
    // 自定义工具条
    private toolbar() {
        return [
            // 系统提供的默认工具条，可以自行选则删除和修改
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock'],
            [   // 自定义工具条 
                {   // 编辑器全屏
                    el: this.fullscreen(),
                    command: 'fullscreen',
                    tooltip: 'fullscreen'
                },
            ],
        ]
    }

    // 编辑器全屏
    private fullscreen() {
        // 定义一个全屏按钮
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = '全屏'
        button.style.margin = '0'
        // 按钮的监听事件
        button.addEventListener('click', () => {
            // 设置高度为占满屏幕
            this.editor.setHeight('100vh');
            const ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement;
            ui.classList.toggle('fullscreen');
        })
        // 添加键盘事件，按ESC退出全屏
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                this.editor.setHeight(this.height);  // 恢复到原来的默认高度
                const ui = document.querySelector('.toastui-editor-defaultUI') as HTMLDivElement;
                ui.classList.remove('fullscreen');
                // 将焦点放回到编辑器中
                this.editor.focus()
            }
        })
        return button
    }

    // 对上传图片方法进行自定义
    private ImageHook() {
        // 移除系统提供默认的图片上传的钩子，系统默认上传的是base64格式的图片，我们需要进行修改
        this.editor.removeHook('addImageBlobHook');
        // 自定义上传图片的钩子      blob: 二进制数据，callback: 回调函数，将内容写道编辑器
        this.editor.addHook('addImageBlobHook', async (blob: any, callback: Function) => {
            // 通过表单的形式上传
            const form = new FormData();
            form.append('file', blob, blob.name);  // 传递二进制数据和文件名
            // 调用接口，将数据进行传递
            const response = await uploadImage(form)
            // 调用回调函数，将内容写道编辑器
            callback(response.data.url, blob.name);
        })
    }
}