import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const useSignup = () => {
    // 에러 정보 저장
    const [error, setError] = useState(null);
    
    // 현재 서버와 통신 상태 저장
    const [isPending, setIsPending] = useState(false);

    const signup = (email, password, displayName) => {
        setError(null); // 아직 에러 없음
        setIsPending(true); // 통신 진행중

        createUserWithEmailAndPassword(appAuth, email, password).then((userCredential) => {
            const user = userCredential.user; // 받아오는 userCredential은 객체임
            console.log(user);

            if (!user) {
                throw new Error('회원가입에 실패했습니다.')
            }

            updateProfile(appAuth.currentUser, { displayName }).then(() => {
                setError(null);
                setIsPending(false);
            }).catch((error) => {
                setError(error.message)
                setIsPending(false);
                console.log(error.message)
            })

        }).catch((error) => {
            setError(error.message);
            setIsPending(false);
            console.log(error.message)
        })
    }
  return { error, isPending, signup }
}

export default useSignup