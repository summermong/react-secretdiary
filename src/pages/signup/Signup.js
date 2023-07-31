import React, {useState} from 'react'
import styles from './Signup.module.css'
import useSignup from '../../hooks/useSignup';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("")
  const { error, isPending, signup } = useSignup();

  const handleData = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else if (e.target.type === "password") {
      setPassword(e.target.value);
    } else if (e.target.type === "text") {
      setDisplayName(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName)
  }

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor='myEmail'>email : </label>
        <input type='email' id="myEmail" required value={email} onChange={handleData} placeholder='이메일을 입력하세요.'/>

        <label htmlFor='myPassword'>password : </label>
        <input type='password' id="myPassword" required value={password} onChange={handleData} placeholder='비밀번호를 입력하세요.'/>

        <label htmlFor='myNickName'>닉네임 : </label>
        <input type='text' id="myNickName" required value={displayName} onChange={handleData} placeholder='닉네임을 입력하세요.'/>

        <button type='submit' className={styles.btn}>회원가입</button>
      </fieldset>
    </form>
  )
}

export default Signup