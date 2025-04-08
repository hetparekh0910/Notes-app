import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./NotesApp.css";

function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="toolbar">
      <button className="button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button className="button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button className="button" onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
      <button className="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
      <button className="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>Numbered List</button>
    </div>
  );
}

export default function NotesApp() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const saveNote = () => {
    if (!title.trim() || !editor.getHTML().trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      content: editor.getHTML(),
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    editor.commands.setContent("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app-container">
        <h1>Notes App With Rich Text-Editor</h1>
      <div className="editor-box">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
        />
        <Toolbar editor={editor} />
        <div className="editor-content">
          <EditorContent editor={editor} />
        </div>
        <button onClick={saveNote} className="button">
          Save Note
        </button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="note-title">{note.title}</h2>
              <button onClick={() => deleteNote(note.id)} className="button delete-button">
                Delete
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          </div>
        ))}
      </div>
    </div>

  );
}
