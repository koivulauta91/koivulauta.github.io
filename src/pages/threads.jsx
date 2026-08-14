import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

import {
  addDoc,
  collection
} from "firebase/firestore";
import {
  collection,
  getDocs,
} from "firebase/firestore";

function Threads() {
  const [threads, setThreads] =
    useState([]);

  useEffect(() => {

    const loadThreads = async () => {

      const snapshot =
        await getDocs(
          collection(db, "threads")
        );

      const data =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      setThreads(data);
    };

    loadThreads();

  }, []);

  return (
    <div>

      <h1>Keskustelulangat</h1>

      {threads.map(thread => (

        <div
          key={thread.id}
          style={{
            border:"1px solid #ccc",
            padding:"10px",
            margin:"10px"
          }}
        >
          <h3>{thread.title}</h3>

          <p>{thread.content}</p>

          <small>
            {thread.author}
          </small>

        </div>

      ))}

    </div>
  );
}

export default Threads;