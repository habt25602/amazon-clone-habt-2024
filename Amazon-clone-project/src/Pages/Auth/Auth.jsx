import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import SigninLogo from "../../assets/images/amazon_sign_in _logo.png";
import style from "../Auth/SignUp.module.css";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navData = useLocation();

  console.log(navData);

  console.log(user);

  const authHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <section className={style.login}>
      <Link to="/">
        <img src={SigninLogo} alt="" />
      </Link>
      {/* form */}
      <div className={style.login_container}>
        <h1>Sign in</h1>

        {navData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navData.state.msg}
          </small>
        )}

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
              type="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </div>

          <button
            onClick={authHandler}
            type="submit"
            className={style.login_signin_btn}
            name="signin"
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign in"}
          </button>
        </form>
        <p>
          By continuing, you agree to the Amazon Fake Clone Conditions of Use
          and Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          onClick={authHandler}
          className={style.login_register}
          name="signup"
        >
          {" "}
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small
            style={{
              color: "red",
              fontSize: "11px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
