import { useFirestoreQueryData } from "@react-query-firebase/firestore"
import { collection, query } from "@firebase/firestore"
import { db } from '../firebase'

const useUserTips = () => {
    const tipRef = collection(db, 'usertips')

    const queryRef = query(tipRef)

    const tipQuery = useFirestoreQueryData(['usertips'], queryRef, {
        idField: 'id',
        subscribe: true,
    })

    return tipQuery
}

export default useUserTips