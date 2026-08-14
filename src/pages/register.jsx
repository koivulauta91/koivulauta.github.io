import { useState } from "react";
import { auth, db } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("fi");

  const register = async () => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          username,
          email,
          language,
          role: "user",
          online: false,
        }
      );

      await sendEmailVerification(
        userCredential.user
      );

      alert(
        "Tili luotu! Tarkista sähköpostisi ja vahvista osoitteesi."
      );
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Rekisteröidy</h2>

      <input
        type="text"
        placeholder="Käyttäjänimi"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Sähköposti"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
      >
        <option value="fi">Suomi</option>
        <option value="en">English</option>
      </select>

      <br />
      <br />

      <button onClick={register}>
        Luo tili
      </button>
    </div>
  );
}

export default Register;