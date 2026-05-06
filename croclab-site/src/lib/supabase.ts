import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  article_slug: string;
  article_title: string | null;
  article_lang: string;
  created_at: string;
};

export type VisitHistory = {
  id: string;
  user_id: string;
  page_path: string;
  page_title: string | null;
  visited_at: string;
};

export type FeatureRequest = {
  id: string;
  user_id: string;
  app_name: string;
  app_name_normalized: string;
  description: string;
  created_at: string;
  profile?: { display_name: string | null; avatar_url: string | null };
};

export type FeatureVote = {
  id: string;
  app_name_normalized: string;
  user_id: string;
  created_at: string;
};

export type WishGroup = {
  app_name: string;
  app_name_normalized: string;
  descriptions: { description: string; user_name: string | null; created_at: string }[];
  vote_count: number;
  submission_count: number;
  has_voted: boolean;
};
