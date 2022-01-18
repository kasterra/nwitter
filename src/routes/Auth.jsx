import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbInstance";
import React, { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      if (newAccount) {
        console.log(
          await createUserWithEmailAndPassword(auth, email, password)
        );
      } else {
        console.log(await signInWithEmailAndPassword(auth, email, password));
      }
    } catch (error) {
      console.error(error);
    }

    alert(`${email} ${password}`);
  };

  const toggleAccount = useCallback(() => {
    setNewAccount((prev) => !prev);
  }, []);

  const onSocialClick = useCallback(async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    console.log(name);
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <input type="submit" value={newAccount ? "create account" : "Login!"} />
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "To Log in" : "To create account"}
      </button>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
