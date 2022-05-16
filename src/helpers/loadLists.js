import { db } from '../firebase/firebase-config';

export const loadLists = async (uid) => {
  const notesSnap = await db.collection(`/${uid}/journal/lists`).get();

  const lists = [];
  notesSnap.forEach((snapHijo) => {
    lists.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  return lists;
};
