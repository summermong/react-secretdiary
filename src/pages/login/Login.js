import React, {useState} from 'react'
import styles from './Login.module.css'
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, login } = useLogin();

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>로그인</legend>
        <label htmlFor='myEmail'>email : </label>
        <input type='email' id="myEmail" required value={email} onChange={handleData} placeholder='이메일을 입력하세요.'/>

        <label htmlFor='myPassword'>password : </label>
        <input type='password' id="myPassword" required value={password} onChange={handleData} placeholder='비밀번호를 입력하세요.'/>

        {!isPending && <button type='submit' className={styles.btn}>로그인</button>}
        {isPending && <strong>로그인 진행중입니다...</strong>}
        {error && <strong>{error}</strong>}
      </fieldset>
    </form>
  )
}

export default Login