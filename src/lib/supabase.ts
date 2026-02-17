import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

console.log('Supabase Config Check:');
console.log('URL:', supabaseUrl);
console.log('Key (start):', supabaseAnonKey?.substring(0, 15) + '...');

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User profile types
export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

// Course types
export interface Course {
    id: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    difficulty: string;
    created_at: string;
}

// User progress types
export interface UserProgress {
    id: string;
    user_id: string;
    course_id: string;
    progress_percentage: number;
    completed: boolean;
    last_accessed: string;
}

// Chat message types
export interface ChatMessage {
    id: string;
    user_id: string;
    message: string;
    response: string;
    created_at: string;
}

// Database helper functions
export const db = {
    // User operations
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
        return data;
    },

    async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (error) {
            console.error('Error updating user profile:', error);
            return false;
        }
        return true;
    },

    async upsertUserProfile(profile: Partial<UserProfile>): Promise<boolean> {
        const { error } = await supabase
            .from('profiles')
            .upsert(profile);

        if (error) {
            console.error('Error upserting user profile:', error);
            return false;
        }
        return true;
    },

    // Course operations
    async getCourses(): Promise<Course[]> {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
        return data || [];
    },

    async getCourse(courseId: string): Promise<Course | null> {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

        if (error) {
            console.error('Error fetching course:', error);
            return null;
        }
        return data;
    },

    // User progress operations
    async getUserProgress(userId: string): Promise<UserProgress[]> {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user progress:', error);
            return [];
        }
        return data || [];
    },

    async updateProgress(userId: string, courseId: string, progress: number): Promise<boolean> {
        const { error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: userId,
                course_id: courseId,
                progress_percentage: progress,
                completed: progress >= 100,
                last_accessed: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating progress:', error);
            return false;
        }
        return true;
    },

    // Chat operations
    async saveChatMessage(userId: string, message: string, response: string): Promise<boolean> {
        const { error } = await supabase
            .from('chat_history')
            .insert({
                user_id: userId,
                message,
                response,
                created_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error saving chat message:', error);
            return false;
        }
        return true;
    },

    async getChatHistory(userId: string, limit: number = 50): Promise<ChatMessage[]> {
        const { data, error } = await supabase
            .from('chat_history')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching chat history:', error);
            return [];
        }
        return data || [];
    },

    // Authentication operations
    auth: {
        async signInWithPassword(credentials: { email: string; password: string }) {
            return await supabase.auth.signInWithPassword(credentials);
        },

        async signUp(credentials: { email: string; password: string; options?: { data?: { full_name?: string;[key: string]: any } } }) {
            return await supabase.auth.signUp(credentials);
        },

        async signInWithOAuth(options: {
            provider: 'google';
            options?: {
                redirectTo?: string;
                scopes?: string;
                queryParams?: { [key: string]: string };
                skipBrowserRedirect?: boolean;
            }
        }) {
            return await supabase.auth.signInWithOAuth(options);
        },

        async signOut() {
            return await supabase.auth.signOut();
        },

        async getSession() {
            return await supabase.auth.getSession();
        },

        async getUser() {
            return await supabase.auth.getUser();
        },

        onAuthStateChange(callback: (event: string, session: any) => void) {
            return supabase.auth.onAuthStateChange(callback);
        },

        async resetPasswordForEmail(email: string, options?: { redirectTo?: string }) {
            return await supabase.auth.resetPasswordForEmail(email, options);
        },

        async updateUser(attributes: { password?: string; data?: any }) {
            return await supabase.auth.updateUser(attributes);
        }
    }
};
