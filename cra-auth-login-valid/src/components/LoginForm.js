import MyInput from "./UI/MyInput";
import { useState } from "react";
import { login } from "../utils/Fetch";
import { useHistory } from "react-router";

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError([...error, { err: "email" }]);
    }
    if (!password) {
      return setError([
        ...error,
        { err: "password", errorMsg: "Password or email is wrong" },
      ]);
    }
    // validate
    console.log("Login");
    const loginRezult = await login(email, password);

    console.log("loginRezult", loginRezult.error);

    if (loginRezult.msg && loginRezult.msg === "success") {
      const { email, token } = loginRezult.data;
      // TODO: make it work with context.api
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userToken", token);
      // TODO: redirect to home page

      history.push("/profile");
    }
    
  };
  function findError(error) {
    const foundErrObj = error.find((errObj) => errObj.err === error);
    return foundErrObj ? foundErrObj.errorMsg : null;
  }

  return (
    <form onSubmit={handleLogin} className="w-50">
      <MyInput
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="your email"
        error={findError}
      />
      <MyInput
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="your Password"
        error={findError}
      />
      <button className="btn btn-success">Login</button>
    </form>
  );
}

export default LoginForm;
