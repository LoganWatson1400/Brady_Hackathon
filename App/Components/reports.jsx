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

export async function deleteReport(report_name) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        await db.runAsync('DELETE FROM reports WHERE report_name = ?', [report_name]);

    } catch(e) {console.error("deleteProfile", e)}
}

export async function getReports(dataBefore, profile_name, callback) {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const selectRows = await db.getAllAsync('SELECT report_name, your_name FROM reports WHERE profile_name = ?', [profile_name]);

        const data = []

        selectRows.forEach(elem => {
            data.push(elem);
        })

        if (!compare(dataBefore, data)) callback(selectRows);
 

    } catch (e) { console.error("getReports", e) }
}

function compare(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Used for debugging
export async function getAllReports() {
    try {
        const db = await sql.openDatabaseAsync('storage.db');
        const selectRows = await db.getAllAsync('SELECT * FROM reports;');

        console.log(selectRows);


    } catch (e) { console.error("getReports", e) }
}