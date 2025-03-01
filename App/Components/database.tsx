import * as sql from "expo-sqlite";


export async function createTable(name: string) {
    const db = await sql.openDatabaseAsync("storage.db")

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY NOT NULL, persons_name TEXT, profile_name TEXT, loc TEXT, desc TEXT, reports_name TEXT);
        `);

        
}

export async function getRows(tableName: string) {
    const db = await sql.openDatabaseAsync("storage.db")

    const allRows = await db.getAllAsync(`SELECT * FROM profile`);
    for (const row of allRows) {
        console.log(row.id, row.value, row.intValue);
    }

}

export async function addRow() {
    const db = await sql.openDatabaseAsync("storage.db")
    const result = await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
    console.log(result.lastInsertRowId, result.changes);
}