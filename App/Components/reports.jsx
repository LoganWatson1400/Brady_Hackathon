import * as sql from "expo-sqlite";
import { useState } from "react";


export async function createReportsTable() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS profiles (profile_name TEXT PRIMARY KEY NOT NULL, loc TEXT, desc TEXT);`);
    } catch (e) { console.error("createProfileTable", e) }
}


export async function addReport(report_name, loc, desc) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync("INSERT INTO profiles (profile_name, loc, desc) VALUES (?, ?, ?);", [profile_name, loc, desc]);
    } catch (e) { console.error("addProfile", e) }
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

    } catch (e) { console.error("getProfiles", e) }

}

export async function deleteProfile(profile_name) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync('DELETE FROM profiles WHERE profile_name = $value', { $value: profile_name });
    } catch (e) { console.error("deleteProfile", e) }
}

export async function deleteProfileTable() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.execAsync(`DROP TABLE IF EXISTS profiles;`);
    } catch (e) { console.error("deleteProfileTable", e) }
}


export async function mapProfiles(data, callBack) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const all_profiles = await db.getAllAsync('SELECT profile_name FROM profiles;');

        all_profiles.forEach(elem => {
            let key = (elem["profile_name"]);

            console.log(!Find(data, key));
            if (Find(data, key)) data.push({ value: elem["profile_name"] });
        });

        console.log(data)
        callBack(data);



    } catch (e) { console.error("mapProfiles", e) }
}

function Find(data, key) {
    data.forEach(elem => {
        return !(elem["value"] == key);
    })
}

export async function grabProfiles(callBack) {
    //{ value: "New Profile" }

    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const all_profiles = await db.getAllAsync('SELECT profile_name FROM profiles;');

        let data = [];
        all_profiles.forEach(elem => {
            data.push({ value: elem["profile_name"] })
        });

        return data;


    } catch (e) { console.error("grabProfiles", e) }
}



