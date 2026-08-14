import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

import {
  doc,
  getDoc
} from "firebase/firestore";

function Profile() {

  const [userData, setUserData] =
    useState(null);

  useEffect(() => {

    const loadUser = async () => {

      if (!auth.currentUser) return;

      const userDoc = await getDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid
        )
      );

      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    loadUser();

  }, []);

  if (!userData) {
    return <h2>Ladataan...</h2>;
  }

  return (
    <div>

      <h1>Profiili</h1>

      <p>
        Käyttäjänimi:
        {userData.username}
      </p>

      <p>
        Sähköposti:
        {userData.email}
      </p>

      <p>
        Kieli:
        {userData.language}
      </p>

      <p>
        Rooli:
        {userData.role}
      </p>

    </div>
  );
}

export default Profile;