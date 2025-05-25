if (!supabaseUrl || !supabaseKey) {
  throw new Error("failed to load supabase url and key");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
