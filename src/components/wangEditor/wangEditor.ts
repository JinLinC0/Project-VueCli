import wangEditor from 'wangeditor'
/**
 * 富文本编辑器组件的配置文件
 */
export default class {
    editor: wangEditor
    constructor(el: string, callback: Function, config: {[key: string]: any}) {
        this.editor = new wangEditor(el)
        this.editor.config.height = config.height  // 设置编辑器高度
        // 配置 onchange 回调
        this.editor.config.onchange = callback  // 事件改变时（文本框中输入内容时），触发回调函数，执行回调函数的内容
        Object.assign(this.editor.config, config)  // 合并配置
        // 上传图片
        this.editor.config.uploadImgHooks = this.uploadImg()
        this.editor.create()
        // 设置编辑器的内容，需要在创建编辑器之后进行设置
        this.editor.txt.html(config.modelValue)
    }
    // 自定义上传图片
    uploadImg() {
        return {
            customInsert: function(insertImgFn: Function, result: any) {
                insertImgFn(result.data.url);
            }
        }
    }
}