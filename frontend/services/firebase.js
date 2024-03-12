import { initializeApp } from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import Constants from 'expo-constants';

// // Initialize Firebase with environment variables
// const firebaseConfig = {
//     apiKey: Constants.extraAPI_KEY,
//     authDomain: Constants.extraAUTH_DOMAIN,
//     projectId: Constants.extraPROJECT_ID,
//     storageBucket: Constants.extraSTORAGE_BUCKET,
//     messagingSenderId: Constants.extraMESSAGING_SENDER_ID,
//     appId: Constants.extraAPP_ID,
//     measurementId: Constants.extraMEASUREMENT_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyAqrZQ3yRMvLMAu6AIiKPF8eNK9L9qcsI4",
    authDomain: "mastertrade-e5a02.firebaseapp.com",
    projectId: "mastertrade-e5a02",
    storageBucket: "mastertrade-e5a02.appspot.com",
    messagingSenderId: "968885766411",
    appId: "1:968885766411:web:4f3b91cc90e7adb278fa0e",
    measurementId: "G-11BZ2PB092"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export {database};