import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';


const useLogin = () => {
    // 에러 정보 저장
    const [error, setError] = useState(null);
    
    // 현재 서버와 통신 상태 저장
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();

    const login = (email, password) => {
        setError(null); // 아직 에러 없음
        setIsPending(true); // 통신 진행중

        signInWithEmailAndPassword(appAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user; // 받아오는 userCredential은 객체임
                dispatch({type: 'login', payload: user})
                setError(null);
                setIsPending(false)

                if (!user) {
                    throw new Error('회원가입에 실패했습니다.')
                }

        }).catch((error) => {
            setError(error.message);
            setIsPending(false);
        })
    }
  return { error, isPending, login }
}

export default useLogin