import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import dotenv from 'dotenv'

dotenv.config()

const firebaseConfig = {
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage }
