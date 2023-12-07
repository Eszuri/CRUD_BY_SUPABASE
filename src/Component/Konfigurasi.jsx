import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_PROJECT_URL,
    import.meta.env.VITE_PROJECT_API_KEY
);

export const name_db = "PercobaanCRUD"


// SQL EDITOR

// create table
// PercobaanCRUD(
//     id int8 primary key,
//     tanggal text,
//     nama text,
//     isi text
// )