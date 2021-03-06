const admin = require("firebase-admin");

let serviceAccount = require("assistantsample-pblkhd-firebase-adminsdk-ac1rx-d6e074331f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://assistantsample-pblkhd.firebaseio.com"
});

const db = admin.firestore();

(async () => {
    try {
        // 1. Add data
        // https://firebase.google.com/docs/firestore/manage-data/add-data
        // 1a. Add a new document with a generated id
        let tokyo = {
            name: "Tokyo",
            country: "Japan"
        };
        let ref = await db.collection("cities").add(tokyo);
        let tokyoId = ref.id;
        console.log("Added document with ID:", tokyoId, tokyo);

        // 2. Delete data
        // https://firebase.google.com/docs/firestore/manage-data/delete-data
        let deleteDoc = db.collection("cities").doc(tokyoId).delete();
        console.log("Deleted document with ID:", tokyoId);

        // 1b. Add a new document in collection "cities" with ID "LA"
        let losAngeles = {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        };
        let setDoc = await db.collection("cities").doc("LA").set(losAngeles);

        // 3. Update
        // https://firebase.google.com/docs/firestore/manage-data/add-data
        console.log("City before update:", losAngeles);
        let updateCountry = await db.collection("cities").doc("LA").update({
            country: "United States of America"
        });

        // 4. Read data
        // https://firebase.google.com/docs/firestore/query-data/get-data
        let allCities = await db.collection("cities").get();
        allCities.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
        });

    } catch (error) {
        console.error("Error happened:", error);
    }
})();