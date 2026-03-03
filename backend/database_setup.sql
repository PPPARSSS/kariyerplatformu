-- Kariyer Platformu - Team Management & Competency Tree SQL Setup
-- Run this script in the Supabase SQL Editor

-- 1. Modify Profiles Table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS hire_date DATE,
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS seniority_level VARCHAR(50);

-- Update existing users to have some default visual data (optional mock data)
UPDATE profiles SET hire_date = CURRENT_DATE - INTERVAL '2 years', experience_years = 2, seniority_level = 'Mid' WHERE experience_years IS NULL;


-- 2. Teams Table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    manager_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, user_id)
);


-- 4. Competency Nodes Table (For the Visual Skill Tree)
CREATE TABLE IF NOT EXISTS competency_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- 'Frontend', 'Backend', 'Leadership' vb.
    description TEXT,
    required_hours INTEGER DEFAULT 0,
    parent_id UUID REFERENCES competency_nodes(id) ON DELETE SET NULL, -- Ağaç hiyerarşisi
    position_x FLOAT, -- UI üzerinde konumlandırma için (opsiyonel ama frontend çizerken lazım olabilir)
    position_y FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Competencies (Kullanıcının Node üzerindeki ilerlemesi)
CREATE TABLE IF NOT EXISTS user_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    node_id UUID REFERENCES competency_nodes(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
    progress_percentage INTEGER DEFAULT 0,
    completed_hours INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, node_id)
);

-- Optional: Enable RLS for teams
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_competencies ENABLE ROW LEVEL SECURITY;

-- Note: Depending on your exact security requirements, you might want to configure policies.
-- By default, for a backend-first approach without direct frontend DB fetching, you can create a service role policy
-- or allow all if the frontend is fully locked behind backend checks.
CREATE POLICY "Allow all operations for authenticated users on teams" ON teams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users on competency_nodes" ON competency_nodes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users on user_competencies" ON user_competencies FOR ALL USING (auth.role() = 'authenticated');
