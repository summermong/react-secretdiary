import styles from "./Nav.module.css"
import { Link } from "react-router-dom"

import React from 'react'

const Nav = () => {
  return (
    <nav className={styles.nav}>
        <h1 className={styles.title}>두근두근 비밀일기</h1>
        <ul className={styles.list_nav}>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
        </ul>
    </nav>
  )
}

export default Nav