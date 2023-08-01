import React, { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore';

const DiaryForm = ({ uid }) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { addDocument, response } = useFirestore('diary')

    const handleData = (e) => {
        if (e.target.id === "title") {
            setTitle(e.target.value)
        } else if (e.target.id === "content") {
            setContent(e.target.value)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title, content);
        await addDocument({ uid, title, content }); // user의 아이디
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>일기 쓰기</legend>
                <label htmlFor='title'>일기 제목: </label>
                <input type='text' id="title" required onChange={handleData} />

                <label htmlFor='content'>일기 내용: </label>
                <textarea type='text' id="content" required onChange={handleData} />
                <button type='submit'>저장하기</button>
            </fieldset>
        </form>
    </>
  )
}

export default DiaryForm