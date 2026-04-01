import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://rsmxetekqhxucunfcasn.supabase.co';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_fkpAKSzj-qWJD-9-wAY53w_LAyUd04R';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
