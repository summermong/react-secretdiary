import React from 'react'
import styles from './Home.module.css'
import DiaryForm from './DiaryForm'
import { useAuthContext } from '../../hooks/useAuthContext'

const Home = () => {

  const {user} = useAuthContext();

  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid} />
      </aside>
      <ul className={styles.content_list}>
        diary list
      </ul>
    </main>

  )
}

export default Home