import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    imageUrl TEXT NOT NULL,
                    address TEXT NOT NULL,
                    latitude REAL NOT NULL,
                    longitude REAL NOT NULL
                );`,
                // 'DROP TABLE places',
                [],
                () => resolve(),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
}

export const insertPlace = (name, imageUrl, address, latitude, longitude) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO places (name, imageUrl, address, latitude, longitude)
                    VALUES (?, ?, ?, ?, ?)`,
                [name, imageUrl, address, latitude, longitude],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
}

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                (_, res) => resolve(res),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
}