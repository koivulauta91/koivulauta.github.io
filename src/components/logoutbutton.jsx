import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function LogoutButton() {

  const logout = async () => {

    await signOut(auth);

    alert("Kirjauduttu ulos");

  };

  return (
    <button onClick={logout}>
      Kirjaudu ulos
    </button>
  );
}

export default LogoutButton;