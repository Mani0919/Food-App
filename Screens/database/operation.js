import { View, Text } from "react-native";
import React from "react";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { Alert } from "react-native";

const dataBase = SQLite.openDatabaseAsync("foodapp.db");

export async function createEntries() {
  try {
    const db = await dataBase;
    await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL ,fullname TEXT NOT NULL, email TEXT UNIQUE, phone TEXT, password TEXT, address Text)
        `);
    console.log("Table created and sample entries added.");
  } catch (error) {
    console.error("Error creating entries: ", error);
  }
}

export async function InsertLoginUsers(name, email, phone, password, address) {
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `INSERT INTO users ( fullname, email, phone,password,address) VALUES ($fullname, $email, $phone,$password,$address)`
    );

    try {
      const res = await st.executeAsync({
        // $id: id,
        $fullname: name,
        $email: email,
        $phone: phone,
        $password: password,
        $address: address,
      });
      console.log("Inserted successfully");
    } catch (error) {
      console.log("Execution error:", error);
    }
  } catch (error) {
    console.log("Database preparation error:", error);
  }
}

export async function checkUserExists(email, password) {
  // console.log("user", username, email);
  if ((!password, !email)) {
    Alert.alert("Username,email required");
  } else if (!email) {
    Alert.alert("Email required");
  } else if (!password) {
    Alert.alert("Password required");
  }
  try {
    const db = await dataBase;
    const st = await db.prepareAsync(
      `SELECT * FROM users WHERE  email = $email AND password=$password`
    );

    const res = await st.executeAsync({
      $email: email,
      $password: password,
    });

    // Fetch all the rows
    const rows = await res.getAllAsync();

    console.log(rows);

    return rows.length > 0;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}


export const user = async (email,password) => {
    try {
      const db = await dataBase;
      const st = await db.prepareAsync(`SELECT * FROM users WHERE email = $email AND password=$password`);
  
      const res = await st.executeAsync({
        $email: email,
        $password:password
      });
  
      // Fetch all the rows
      const rows = await res.getAllAsync();
  
      console.log("eee",rows);
  
      return rows;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };
