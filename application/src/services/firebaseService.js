import {
    collection,
    addDoc,
    getDoc,
    doc,
    updateDoc,
    onSnapshot
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const SESSIONS_COLLECTION = 'sessions';

export const createSessionInDb = async (sessionName, username) => {
    const sessionData = {
        sessionName,
        users: [{ name: username, selectedCard: null }],
        showCards: false
    };

    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), sessionData);
    const sessionSnap = await getDoc(docRef);

    return {
        id: docRef.id,
        data: sessionSnap.data()
    };
};

export const getSessionFromDb = async (sessionId) => {
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);
    const sessionSnap = await getDoc(sessionRef);

    return {
        exists: sessionSnap.exists(),
        data: sessionSnap.exists() ? sessionSnap.data() : null
    };
};

export const updateSessionUsers = async (sessionId, users, showCards = undefined) => {
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);
    const updateData = { users };

    if (showCards !== undefined) {
        updateData.showCards = showCards;
    }

    await updateDoc(sessionRef, updateData);
};

export const toggleCardsInDb = async (sessionId, showCards) => {
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);
    await updateDoc(sessionRef, { showCards });
};

export const resetVotesInDb = async (sessionId, users) => {
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);
    await updateDoc(sessionRef, {
        users,
        showCards: false
    });
};

export const subscribeToSessionChanges = (sessionId, callback) => {
    const sessionRef = doc(db, SESSIONS_COLLECTION, sessionId);

    return onSnapshot(sessionRef, (sessionSnap) => {
        if (sessionSnap.exists()) {
            callback(sessionSnap.data());
        }
    });
};

export const addUserToSession = async (sessionId, username, existingUsers) => {
    const updatedUsers = [...existingUsers, { name: username, selectedCard: null }];
    await updateSessionUsers(sessionId, updatedUsers, false);
    return updatedUsers;
};
