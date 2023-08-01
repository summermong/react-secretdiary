import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useReducer, useEffect } from 'react';
import { appAuth } from '../firebase/config';

// context를 객체를 생성합니다.
const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            //전개구문을 이용해 객체의 user 값을 업데이트 합니다.
            return { ...state, user: action.payload }
        case 'logout':
            //전개구문을 이용해 객체의 user 값을 업데이트 합니다.
            return { ...state, user: null }
        case 'isAuthReady':
            return {...state, user:action.payload, isAuthReady: true}
        default:
            return state
    }
}

// context를 객체를 구독할 컴포넌트의 묶음 범위를 설정합니다.
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            dispatch({ type: 'isAuthReady', payload: user });
        })
        return unsubscribe
    }, [])

    console.log(state)
    return (
		// { ...state, dispatch } 이 두 가지 값이 context객체를 통해 접근할 수 있는 값이 됩니다.
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };