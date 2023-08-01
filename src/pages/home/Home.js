import React from 'react'
import styles from './Home.module.css'
import DiaryForm from './DiaryForm'

const Home = () => {
  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm />
      </aside>
      <ul className={styles.content_list}>
        diary list
      </ul>
    </main>

  )
}

export default Home