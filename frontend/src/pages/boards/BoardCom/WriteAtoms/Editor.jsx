import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({ value, onChange }) => {
  const handleEditorChange = (content, editor) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
      initialValue={value}
      init={{
        plugins: [
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "searchreplace",
          "fullscreen",
          "media",
          "table",
          "code",
          "help",
          "emoticons",
          "codesample",
          "quickbars",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
        force_br_newlines: true,
        force_p_newlines: false,
        forced_root_block: "",

        height: "900",
        setup: (editor) => {
          editor.on("init", () => {
            editor.setContent(value);
          });

          editor.on("change", () => {
            handleEditorChange(editor.getContent());
          });
        },
      }}
    />
  );
};

export default TinyMCEEditor;
