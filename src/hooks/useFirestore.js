import { collection, addDoc, deleteDoc, doc } from "firebase/firestore"
import { useReducer } from "react"
import { appFireStore, timeStamp } from "../firebase/config"

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending': 
            return { isPending : true, document: null, success: false, error: null };
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload };
        case 'deleteDoc':
            return { isPending: false, document: action.payload, success: true, error: null };   
        default:
            return state // initState
    }
}

// firestore는 데이터를 객체로 저장함 (transaction === 저장할 컬렉션)
// data(데이터) > document(데이터를 객체로 저장하는 공간) > collection(문서의 컨테이너)
export const useFirestore = (transaction) => {
    const [response, dispatch] = useReducer(storeReducer, initState)
    
    // 콜렉션의 참조 요청
    // 콜렉션을 만들지 않았으면 자동으로 만들어서 그 주소를 colRef에 할당해줌
    const colRef = collection(appFireStore, transaction);

    // 콜렉션에 문서 추가
    const addDocument = async (doc) => {
        dispatch({ type: "isPending" })

        try {
            const createdTime = timeStamp.fromDate(new Date());
            const docRef = await addDoc(colRef, { ...doc, createdTime });
            console.log(docRef)
            dispatch({ type: "addDoc", payload: docRef});
            
        } catch (error) {
            dispatch({ type: "error", payload: error.message })
        }
    }

    // 콜렉션에서 문서 제거
    const deleteDocument = async (id) => {
        dispatch({ type: "isPending" })
    
            try {
                const docRef = await deleteDoc(doc(colRef, id));
                dispatch({ type: "deleteDoc", payload: docRef});
                
            } catch (error) {
                dispatch({ type: "error", payload: error.message })
            }
        }

    return { addDocument, deleteDocument, response }
}