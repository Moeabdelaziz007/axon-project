-- Enable Row Level Security (RLS) for all tables
-- Run this in Supabase SQL Editor to fix the security warnings

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE north_stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge ENABLE ROW LEVEL SECURITY;

-- Create basic policies (allow all for authenticated users - you can make these more restrictive later)
-- Users can see all users (for team collaboration)
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Teams policies
CREATE POLICY "Team members can view their team" ON teams FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.team_id = teams.id AND users.id = auth.uid())
);

-- Projects policies  
CREATE POLICY "Team members can view their projects" ON projects FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.team_id = projects.team_id AND users.id = auth.uid())
);

-- Tasks policies
CREATE POLICY "Team members can view team tasks" ON tasks FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = tasks.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Team members can manage team tasks" ON tasks FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = tasks.project_id AND u.id = auth.uid()
  )
);

-- Progress entries policies
CREATE POLICY "Team members can view progress" ON progress_entries FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = progress_entries.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Users can create progress entries" ON progress_entries FOR INSERT WITH CHECK (
  auth.uid() = author_id AND
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = progress_entries.project_id AND u.id = auth.uid()
  )
);

-- Similar policies for other tables
CREATE POLICY "Team members can view goals" ON goals FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = goals.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Team members can view north stars" ON north_stars FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = north_stars.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Team members can view milestones" ON milestones FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = milestones.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Team members can view knowledge" ON knowledge FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects p 
    JOIN users u ON u.team_id = p.team_id 
    WHERE p.id = knowledge.project_id AND u.id = auth.uid()
  )
);

CREATE POLICY "Team members can view activity logs" ON activity_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM tasks t
    JOIN projects p ON p.id = t.project_id
    JOIN users u ON u.team_id = p.team_id 
    WHERE t.id = activity_logs.task_id AND u.id = auth.uid()
  )
);
