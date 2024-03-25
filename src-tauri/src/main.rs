// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![install_mod])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
async fn install_mod(download_link: String, folder: String, loader: String, _base_path: String) {
  println!("{}", download_link.clone() + " | " + &folder + " | " + &loader);
}