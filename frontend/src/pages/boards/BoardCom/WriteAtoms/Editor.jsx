import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module";
const Font = Quill.import("formats/font");
const Size = Quill.import("formats/size");
Font.whitelist = ["dotum", "gullim", "batang", "NanumGothic"];
Size.whitelist = ["8", "9", "10", "11", "12", "14", "18", "24", "36"];
Quill.register(Size, true);
Quill.register(Font, true);
Quill.register("modules/imageResize", ImageResize);

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      editorHtml: "",
    };
    this.reactQuillRef = React.createRef();
  }
  handleEditorFocus = () => {
    const editor = this.reactQuillRef.current.getEditor();
    if (editor && typeof editor.focus === "function") {
      editor.focus();
    }
  };

  handleChange(value) {
    this.content = value;
  }
  render() {
    const modules = {
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          [
            {
              size: Size.whitelist,
            },
          ],
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
          ],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "video"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: this.imageHandler,
        },
      },
      imageResize: true,
    };
    const formats = [
      "font",
      "size",
      "header",
      "bold",
      "italic",
      "underline",
      "align",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "color",
      "background",
      "image",
      "video",
    ];

    const editorHeight = `calc(100vh - ${70}px)`;
    return (
      <>
        <ReactQuill
          modules={modules}
          formats={formats}
          style={{ width: "100%", height: editorHeight }}
          value={this.state.editorHtml}
          ref={this.reactQuillRef}
          onFocus={this.handleEditorFocus}
        >
          <div id="react-quill" />
        </ReactQuill>
      </>
    );
  }
}
