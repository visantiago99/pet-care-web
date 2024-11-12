"use client";

import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

export default function RichTextEditor({
  content,
  onChange,
  isReadOnly,
}: {
  content: string;
  onChange: (richText: string) => void;
  isReadOnly?: boolean;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: true,
    editable: !isReadOnly,
    editorProps: {
      attributes: {
        class: "rounded-mb border border-input bg-black",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      {!isReadOnly && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
