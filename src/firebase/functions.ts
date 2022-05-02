import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const handleGetDocs = async () => {
  const todoCol = collection(db, 'todos');
  const todosSnapshot = await getDocs(todoCol);
  const todoList = todosSnapshot.docs.map((doc) => doc.data());
  return todoList;
};

export const handleSetDocs = async (data) => {
  const todoCol = collection(db, 'todos');
};

export const handleCreateUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const handleLogin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
