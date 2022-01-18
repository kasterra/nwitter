import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
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

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
};

export default AuthForm;
