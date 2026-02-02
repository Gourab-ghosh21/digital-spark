-- Create profiles table for user data
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create honeypot_sessions table
CREATE TABLE public.honeypot_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'monitoring', 'terminated')),
    scam_type TEXT,
    channel TEXT,
    messages_count INTEGER NOT NULL DEFAULT 0,
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    scam_detected BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.honeypot_sessions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view sessions
CREATE POLICY "Authenticated users can view sessions" 
ON public.honeypot_sessions FOR SELECT 
TO authenticated
USING (true);

-- Create extracted_intelligence table
CREATE TABLE public.extracted_intelligence (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT REFERENCES public.honeypot_sessions(session_id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('bank', 'upi', 'phone', 'link')),
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.extracted_intelligence ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view intelligence
CREATE POLICY "Authenticated users can view intelligence" 
ON public.extracted_intelligence FOR SELECT 
TO authenticated
USING (true);

-- Create messages table for conversation history
CREATE TABLE public.messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT REFERENCES public.honeypot_sessions(session_id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('scammer', 'agent')),
    text TEXT NOT NULL,
    flagged BOOLEAN DEFAULT false,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view messages
CREATE POLICY "Authenticated users can view messages" 
ON public.messages FOR SELECT 
TO authenticated
USING (true);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_honeypot_sessions_updated_at
    BEFORE UPDATE ON public.honeypot_sessions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();