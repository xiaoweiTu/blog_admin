<template>
  <div>
    <div :id="id" />
    <input ref="files" style="display: none" type="file" accept="image/*" @change="uploadFile">
  </div>
</template>

<script>
// deps for editor
import 'codemirror/lib/codemirror.css' // codemirror
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content
import 'highlight.js/styles/github.css'

import Editor from 'tui-editor'
import defaultOptions from './default-options'
import request from '@/utils/request'

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    language: {
      type: String,
      required: false,
      default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue)
      }
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.editor.height(newValue)
    },
    mode(newValue) {
      this.editor.changeMode(newValue)
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      })
      if (this.value) {
        this.editor.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue())
      })
      /*
        * 添加自定义按钮
        * */
      // 获取编辑器上的功能条
      const toolbar = this.editor.getUI().getToolbar()
      const fileDom = this.$refs.files
      // 添加事件
      this.editor.eventManager.addEventType('uploadEvent')
      this.editor.eventManager.listen('uploadEvent', () => {
        fileDom.click()
        // Do some other thing...
      })
      // 添加自定义按钮 第二个参数代表位置，不传默认放在最后
      toolbar.addButton({
        name: 'customize',
        className: 'upload-img',
        event: 'uploadEvent',
        tooltip: 'insert image'
      }, 13)
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor.remove()
    },
    setValue(value) {
      this.editor.setValue(value)
    },
    getValue() {
      return this.editor.getValue()
    },
    setHtml(value) {
      this.editor.setHtml(value)
    },
    getHtml() {
      return this.editor.getHtml()
    },
    uploadFile(e) {
      const target = e.target
      const file = target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      request({
        method: 'post',
        url: process.env.VUE_APP_UPLOAD_ACTION,
        data: formData
      })
        .then(res => {
          // 上传成功地址拼接
          const imgUrl = res.data
          this.addImgToMd(imgUrl)
        })
        .catch(error => {
          console.error(error.response)
        })
      target.value = ''
    },
    // 添加图片到markdown
    addImgToMd(data) {
      const editor = this.editor.getCodeMirror()
      const editorHtml = this.editor.getCurrentModeEditor()
      const isMarkdownMode = this.editor.isMarkdownMode()
      if (isMarkdownMode) {
        editor.replaceSelection(`![img](${data})`)
      } else {
        const range = editorHtml.getRange()
        const img = document.createElement('img')
        img.src = `${data}`
        img.alt = 'img'
        range.insertNode(img)
      }
    }
  }
}
</script>
<style lang="scss">
  .upload-img.tui-toolbar-icons {
    background-position: -130px -4px;
  }
</style>
