import database from './firebase';

export const retrieveTimes = async (uid) => await database.ref(`users/${uid}`).once('value');

export const setTimes = async (uid, times) => await database.ref(`users/${uid}`).set(times);

export const patchTimes = async (uid, problemId, newTime) => await database.ref(`users/${uid}/${problemId}`).set(newTime);