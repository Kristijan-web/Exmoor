import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ksdtxkabydxpsyogdbdb.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZHR4a2FieWR4cHN5b2dkYmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzI0NjksImV4cCI6MjA2MDE0ODQ2OX0.T3-cleAU5dDycOcwgKT9zxe1Pa5BD3OE4jRccMo7TW0`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
