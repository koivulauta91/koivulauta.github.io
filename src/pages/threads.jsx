import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useParams, useLocation } from "react-router-dom";

function Threads() {
  const [threads, setThreads] = useState([]);
  const params = useParams();
  const location = useLocation();

  const categoryFromParam = params.slug;
  const categoryFromQuery = new URLSearchParams(location.search).get('category');
  const category = categoryFromParam || categoryFromQuery || null;

  useEffect(() => {
    const loadThreads = async () => {
      try {
        let q;
        if (category) {
          q = query(collection(db, "threads"), where("category", "==", category), orderBy('createdAt', 'desc'));
        } else {
          q = query(collection(db, "threads"), orderBy('createdAt', 'desc'));
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setThreads(data);
      } catch (err) {
        console.error('Failed to load threads', err);
      }
    };

    loadThreads();
  }, [category]);

  return (
    <div>
      <h1>{category ? `Category: ${category}` : 'All threads'}</h1>

      {threads.map(thread => (
        <div key={thread.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <h3>{thread.title}</h3>
          <p>{thread.content}</p>
          <small>{thread.author} • {thread.category}</small>
        </div>
      ))}

    </div>
  );
}

export default Threads;