import * as sql from "expo-sqlite";

export async function createProfileTable(called) {
    if(!called) {
        try {
            const db = await sql.openDatabaseAsync('storage.db');
            await db.execAsync(`CREATE TABLE IF NOT EXISTS profiles (profile_name TEXT PRIMARY KEY NOT NULL, loc TEXT, desc TEXT);`);
        } catch(e) {console.error("createProfileTable", e)}
    }
}


export async function addProfile(profile_name, loc, desc) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync("INSERT INTO profiles (profile_name, loc, desc) VALUES (?, ?, ?);", [profile_name, loc, desc]);
    } catch(e) {console.error("addProfile", e)}
}

export async function getProfiles(callBack) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const all_profiles = await db.getAllAsync('SELECT profile_name FROM profiles;');
        let profile_list = [];

        all_profiles.forEach(elem => {
            profile_list.push(elem["profile_name"])
        });

        callBack(profile_list);

    } catch(e) {console.error("getProfiles", e)}

}

export async function deleteProfile(profile_name) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync('DELETE FROM profiles WHERE profile_name = $value', { $value: profile_name });

    } catch(e) {console.error("deleteProfile", e)}
}

export async function deleteProfileTable() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.execAsync(`DROP TABLE IF EXISTS profiles;`);
    } catch(e) {console.error("deleteProfileTable", e)}
}


export async function mapProfiles(dataBefore, callBack) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const all_profiles = await db.getAllAsync('SELECT profile_name FROM profiles;');

        let profile_list = [];

        all_profiles.forEach(elem => {
            profile_list.push({"value" : elem["profile_name"]})
        });

        if(!compare(dataBefore, profile_list)) callBack(profile_list);

    } catch (e) { console.error("mapProfiles", e) }
}

function compare(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export async function editProfile(profile_name, loc, desc) {
    try {
    const db = await sql.openDatabaseAsync('storage.db');
    await db.runAsync('UPDATE profiles SET loc = ?, desc = ? WHERE profile_name = ?', [loc, desc, profile_name]);
    } catch (e) { console.error("editProfile", e) }
}

