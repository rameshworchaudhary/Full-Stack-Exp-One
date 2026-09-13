import React, { useState } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Instagram");
  const [post, setPost] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null);

  const saveDraft = () => {
    if (!post.trim()) {
      alert("Write something first!");
      return;
    }

    if (editing !== null) {
      const copy = [...drafts];
      copy[editing].text = post;
      copy[editing].platform = platform;
      copy[editing].image = image;
      setDrafts(copy);
      setEditing(null);
    } else {
      setDrafts([
        {
          text: post,
          platform,
          image,
        },
        ...drafts,
      ]);
    }

    setPost("");
    setImage(null);
  };

  const deleteDraft = (index) => {
    const copy = drafts.filter((_, i) => i !== index);
    setDrafts(copy);
  };

  const editDraft = (index) => {
    setPost(drafts[index].text);
    setPlatform(drafts[index].platform);
    setImage(drafts[index].image);
    setEditing(index);
  };

  const publish = () => {
    alert("🎉 Post Published Successfully!");
    setPost("");
    setImage(null);
  };

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="app">

      <div className="card">

        <h1>🚀 Social Media Composer</h1>

        <p>Create beautiful social media posts</p>

        <label>Select Platform</label>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>LinkedIn</option>
          <option>X (Twitter)</option>
        </select>

        <textarea
          placeholder="What's on your mind?"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />

        {image && (
          <img
            src={image}
            alt=""
            className="preview"
          />
        )}

        <div className="bottom">

          <label className="upload">

            📷 Upload Image

            <input
              type="file"
              hidden
              onChange={uploadImage}
            />

          </label>

          <span>{post.length}/2200</span>

        </div>

        <div className="buttons">

          <button className="draft" onClick={saveDraft}>
            💾 {editing !== null ? "Update Draft" : "Save Draft"}
          </button>

          <button className="publish" onClick={publish}>
            🚀 Publish
          </button>

        </div>

      </div>

      <div className="draftSection">

        <h2>📂 Saved Drafts</h2>

        {drafts.length === 0 ? (
          <div className="empty">
            No Drafts Yet
          </div>
        ) : (
          drafts.map((item, index) => (
            <div className="draftCard" key={index}>

              <h3>{item.platform}</h3>

              <p>{item.text}</p>

              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="draftImage"
                />
              )}

              <div className="actions">

                <button
                  className="edit"
                  onClick={() => editDraft(index)}
                >
                  ✏ Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteDraft(index)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default App;