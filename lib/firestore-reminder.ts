// lib/firestore-reminder.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface FirestoreReminder {
  id?: string
  date: string        // YYYY-MM-DD
  time: string        // HH:mm
  medicines: string[]
  taken: boolean
  createdAt?: any
}

/* GET ALL REMINDERS */
export const getReminders = async (uid: string) => {
  const ref = collection(db, "users", uid, "reminders")
  const q = query(ref, orderBy("date", "asc"))
  const snap = await getDocs(q)

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as FirestoreReminder[]
}

/* ADD SINGLE REMINDER */
export const addReminder = async (
  uid: string,
  data: FirestoreReminder
) => {
  const ref = collection(db, "users", uid, "reminders")
  await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  })
}

/* DELETE REMINDER */
export const deleteReminder = async (
  uid: string,
  reminderId: string
) => {
  const ref = doc(db, "users", uid, "reminders", reminderId)
  await deleteDoc(ref)
}
