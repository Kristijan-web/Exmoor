import { createClient } from "@supabase/supabase-js";
<<<<<<< HEAD
const supabaseUrl = "https://uaeozjttrvrpjlgyopnu.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZW96anR0cnZycGpsZ3lvcG51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NDQzMTgsImV4cCI6MjA0NTEyMDMxOH0.yyDHe018Kx7fLRtKnlEtpONkDo9Ou6VGfIRD6YSoHIQ`;
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("failed to load supabase url and key");
}

>>>>>>> 0e75c49 (Removed env from commiting)
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
