import React from 'react'
import styles from './Home.module.css'
import { deleteDoc } from 'firebase/firestore'
import { useFirestore } from '../../hooks/useFirestore'

const DiaryList = ({ diaries }) => {
    const {deleteDocument} = useFirestore('diary')
  return (
    <>
        {
            diaries.map((item) => {
                return (
                    <li key={item.id}>
                        <strong className={styles.title}>{item.title}</strong>
                        <p className={styles.content}>{item.content}</p>
                        <button type='button' onClick={() => {deleteDocument(item.id)}}>삭제</button>
                    </li>
                )
            })
        }
    </>
  )
}

export default DiaryList