// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use winreg::enums::*;
use std::io::ErrorKind;
use winreg::RegKey;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![expand_scope,get_steam_path])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn expand_scope(app_handle: tauri::AppHandle, folder_path: std::path::PathBuf) -> Result<(), String> {
  app_handle.fs_scope().allow_directory(&folder_path, true)
    .map_err(|err| err.to_string())
}

#[tauri::command]
fn get_steam_path() -> String {
  let hkcu = RegKey::predef(HKEY_CURRENT_USER);

  let steam = hkcu.open_subkey("Software\\Valve\\Steam").unwrap_or_else(|e| match e.kind() {
    ErrorKind::NotFound => panic!("Key doesn't exist"),
    ErrorKind::PermissionDenied => panic!("Access denied"),
    _ => panic!("{:?}", e),
  });

  let path: String = steam.get_value("SteamPath").unwrap_or_else(|e| match e.kind() {
    ErrorKind::NotFound => panic!("Key doesn't exist"),
    ErrorKind::PermissionDenied => panic!("Access denied"),
    _ => panic!("{:?}", e),
  });

  path.into()
}