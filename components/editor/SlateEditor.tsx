// components/SlateEditor.tsx
"use client";
import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'Type something here...' }],
    },
  ]);

  const renderElement = useCallback(props => <p {...props.attributes}>{props.children}</p>, []);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable renderElement={renderElement} />
    </Slate>
  );
}
