import { useState } from "react";

import { auth, db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

function Boards() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createThread = async () => {
    try {
      if (!auth.currentUser) {
        alert("Kirjaudu sisään ensin.");
        return;
      }

      const userRef = doc(
        db,
        "users",
        auth.currentUser.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("Käyttäjätietoja ei löytynyt.");
        return;
      }

      const userData =
        userSnap.data();

      await addDoc(
        collection(db, "threads"),
        {
          title,
          content,
          language:
            userData.language || "fi",

          author:
            userData.username ||
            auth.currentUser.email,

          authorId:
            auth.currentUser.uid,

          createdAt:
            new Date(),

          replies: 0,
        }
      );

      alert("Keskustelu luotu!");

      setTitle("");
      setContent("");

    } catch (error) {
      console.error(error);

      alert(
        "Virhe: " +
          error.message
      );
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Luo keskustelu</h1>

      <input
        type="text"
        placeholder="Otsikko"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <textarea
        placeholder="Kirjoita viesti..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
        }}
      />

      <br />
      <br />

      <button
        onClick={createThread}
      >
        Luo keskustelulanka
      </button>
    </div>
  );
}

export default Boards;