import * as sql from "expo-sqlite";

export async function createReportTable() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.execAsync(`CREATE TABLE IF NOT EXISTS reports (profile_name, your_name TEXT, report_name TEXT);`);
    } catch (e) { console.error("createReportTable", e) }
}


export async function addReport(profile_name, your_name, report_name) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync("INSERT INTO reports (profile_name, your_name, report_name) VALUES (?, ?, ?);", [profile_name, your_name, report_name]);
    } catch (e) { console.error("addReport", e) }
}

export async function deleteReportTable() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.execAsync(`DROP TABLE IF EXISTS reports;`);
    } catch(e) {console.error("deleteReportTable", e)}
}

