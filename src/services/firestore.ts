import type { WatchListData } from "@/types/movies";
import { db } from "./firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { toast } from "sonner";
import { useCallback } from "react";

export const useFirestore = () => {

    // addDoc : generate Id to document
    // setDoc : I set The Id to document 
    const addDocument = async (collectionName: string, data: WatchListData) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    }

    const addToWatchlist = async (userId: string, dataId: string, data: WatchListData) => {
        try {
            if (await checkIfInWatchlist(userId, dataId)) {
                toast.error("This item is already in your wathclist.");
                return false;
            }
            await setDoc(doc(db, "users", userId, "watchlist", dataId), data)
            toast.success("Added to watchlist");
        } catch (err) {
            console.log(err, "Error adding document");
            toast.error("An error occurred");
        }
    }

    const checkIfInWatchlist = async (userId: string, dataId: string) => {
        const docRef = doc(db, "users", userId.toString(), "watchlist", dataId.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    }

    const removeFromWatchlist = async (userId: string, dataId: string) => {
        try {
            const docRef = doc(db, "users", userId.toString(), "watchlist", dataId.toString());
            await deleteDoc(docRef);
            toast.success("Removed from watchlist");
        } catch (err) {
            console.log(err, "Error while deleting doc");
            toast.error("An error occurred");
        }
    }

    const getWatchlist = useCallback(async (userId: string) => {
        const docRef = collection(db, "users", userId, "watchlist");
        const snapshot = await getDocs(docRef);
        const data = snapshot.docs.map(doc => ({
            ...doc.data(),
        } as WatchListData));

        return data;
    }, [])

    return {
        addDocument,
        addToWatchlist,
        checkIfInWatchlist,
        removeFromWatchlist,
        getWatchlist
    }
}