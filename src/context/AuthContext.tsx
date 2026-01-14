'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type User = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  created_at?: string
  subscription?: {
    plan: string
    status: 'active' | 'inactive' | 'cancelled'
    expiresAt?: string
  }
}

type SignUpResponse = {
  user: User
  session: Session | null
  emailConfirmationSent: boolean
}

type AuthContextType = {
  session: Session | null
  user: User | null
  loading: boolean
  initialized: boolean
  signIn: (email: string, password: string) => Promise<{
    error: Error | null
    data: Session | null
  }>
  signUp: (email: string, password: string, name: string) => Promise<{
    error: Error | null
    data: SignUpResponse | null
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  const mapSupabaseUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
    console.log('Mapping Supabase user:', supabaseUser);
    if (!supabaseUser) {
      console.log('No Supabase user provided');
      return null;
    }
    
    // Lade Subscription-Daten aus Supabase
    let subscriptionData: {
      plan: string;
      status: 'active' | 'inactive' | 'cancelled';
      expiresAt?: string;
    } = {
      plan: 'Free',
      status: 'active',
    };

    try {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .maybeSingle();

      if (!error && subscription) {
        subscriptionData = {
          plan: subscription.plan || 'Free',
          status: subscription.status || 'active',
          expiresAt: subscription.current_period_end,
        };
      } else if (error) {
        console.warn('Subscription query error (using Free plan as fallback):', error);
      }
    } catch (error) {
      console.error('Error loading subscription (using Free plan as fallback):', error);
    }
    
    const userData: User = {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      firstName: supabaseUser.user_metadata?.firstName || supabaseUser.user_metadata?.full_name?.split(' ')[0],
      lastName: supabaseUser.user_metadata?.lastName || supabaseUser.user_metadata?.full_name?.split(' ').slice(1).join(' '),
      created_at: supabaseUser.created_at,
      subscription: subscriptionData
    };
    
    console.log('Mapped user data:', userData);
    return userData;
  }

  useEffect(() => {
    console.log('Setting up auth state listener...');
    let mounted = true
    
const getInitialSession = async () => {
  try {
    console.log('Checking for existing session...');
    setLoading(true);
    
    // First check if we have an existing session
    const { data: { session: existingSession }, error: sessionError } = await supabase.auth.getSession()
    
    console.log('Session check result:', { 
      hasSession: !!existingSession, 
      user: existingSession?.user,
      error: sessionError 
    });
    
    if (mounted) {
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        throw sessionError;
      }
      
      if (existingSession) {
        console.log('Found existing session, mapping user...');
        const mappedUser = await mapSupabaseUser(existingSession.user);
        console.log('Mapped user from session:', mappedUser);
        
        setSession(existingSession);
        setUser(mappedUser);
      } else {
        console.log('No existing session found');
        setSession(null);
        setUser(null);
      }
      
      setInitialized(true);
      setLoading(false);
    }
  } catch (error) {
    console.error('Error in auth initialization:', error);
    if (mounted) {
      setSession(null);
      setUser(null);
      setInitialized(true);
      setLoading(false);
    }
  }
};

    getInitialSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, {
          session: session ? 'exists' : 'null',
          user: session?.user?.email || 'no user'
        });
        
        // Update state based on auth event
        const mappedUser = await mapSupabaseUser(session?.user || null);
        setSession(session)
        setUser(mappedUser)
        setInitialized(true)
        
        console.log('Auth state updated in context', { 
          event, 
          hasUser: !!session?.user,
          userEmail: session?.user?.email 
        });
        
        // Handle specific auth events
        switch (event) {
          case 'SIGNED_IN':
            // Don't redirect automatically on sign in
            console.log('User signed in:', session?.user?.email);
            break
            
          case 'SIGNED_OUT':
            setSession(null)
            setUser(null)
            console.log('User signed out');
            break
            
          case 'TOKEN_REFRESHED':
            // Session was refreshed, no action needed
            console.log('Token refreshed');
            break
            
          case 'USER_UPDATED':
            // User data was updated, no action needed
            console.log('User updated');
            break
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [router])

  console.log('AuthContext value updated:', { user, session, loading, initialized });

  const value: AuthContextType = {
    session,
    user,
    loading,
    initialized,
    signIn: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Ensure the session is properly set
        if (data?.session) {
          setSession(data.session);
          const mappedUser = await mapSupabaseUser(data.session.user);
          setUser(mappedUser);
        }
        
        return { 
          error: null, 
          data: data?.session || null 
        };
      } catch (error) {
        console.error('Sign in error:', error);
        return { 
          error: error instanceof Error ? error : new Error('An error occurred during sign in'), 
          data: null 
        };
      }
    },
    signUp: async (email: string, password: string, name: string) => {
      try {
        const [firstName, ...lastNameParts] = name.split(' ');
        const lastName = lastNameParts.join(' ');
        
        // First sign up the user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              firstName,
              lastName,
              full_name: name
            }
          }
        });

        if (error) throw error;

        // If we have a user, create/update their profile
        if (data?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              full_name: name,
              updated_at: new Date().toISOString(),
            });

          if (profileError) throw profileError;
        }

        const mappedUser = await mapSupabaseUser(data?.user || null);
        
        return { 
          error: null, 
          data: {
            user: mappedUser as User,
            session: data?.session || null,
            emailConfirmationSent: !!data?.user?.identities?.some(i => i.identity_data?.email === email)
          }
        };
      } catch (err) {
        console.error('Error during sign up:', err);
        return { 
          error: err instanceof Error ? err : new Error('An error occurred during sign up'), 
          data: null 
        };
      }
    },
    signOut: async () => {
      try {
        // First sign out from Supabase
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Clear local state
        setSession(null)
        setUser(null)
        
        // Use window.location to ensure a full page reload and clear any cached state
        window.location.href = '/login'
      } catch (error) {
        console.error('Error signing out:', error)
        // Even if there's an error, we want to clear the local state
        setSession(null)
        setUser(null)
        window.location.href = '/login'
        throw error
      }
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth muss innerhalb eines AuthProviders verwendet werden')
  }
  return context
}