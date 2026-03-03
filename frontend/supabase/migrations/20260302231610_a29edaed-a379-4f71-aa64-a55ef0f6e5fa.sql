
-- Career paths table - a path assigned to an employee
CREATE TABLE public.career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_user_id uuid NOT NULL,
  created_by uuid NOT NULL,
  title text NOT NULL DEFAULT 'Kariyer Yolu',
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Career nodes - individual nodes in the tree
CREATE TABLE public.career_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_path_id uuid NOT NULL REFERENCES public.career_paths(id) ON DELETE CASCADE,
  parent_node_id uuid REFERENCES public.career_nodes(id) ON DELETE SET NULL,
  title text NOT NULL,
  node_type text NOT NULL DEFAULT 'skill', -- skill, training, project, exam, assignment, milestone
  status text NOT NULL DEFAULT 'locked', -- locked, in_progress, completed
  priority integer NOT NULL DEFAULT 0, -- ordering / priority
  difficulty text DEFAULT 'orta', -- kolay, orta, zor, ileri
  description text,
  requirements text, -- what is expected
  resources text, -- links, materials
  estimated_hours integer,
  position_x float NOT NULL DEFAULT 0,
  position_y float NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_nodes ENABLE ROW LEVEL SECURITY;

-- Career paths policies
CREATE POLICY "Employees can view own career paths"
ON public.career_paths FOR SELECT
USING (auth.uid() = employee_user_id);

CREATE POLICY "Managers can view team career paths"
ON public.career_paths FOR SELECT
USING (public.is_manager_of(auth.uid(), employee_user_id));

CREATE POLICY "Managers+ can create career paths"
ON public.career_paths FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

CREATE POLICY "Managers+ can update career paths"
ON public.career_paths FOR UPDATE
USING (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

CREATE POLICY "Managers+ can delete career paths"
ON public.career_paths FOR DELETE
USING (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

CREATE POLICY "IK can view all career paths"
ON public.career_paths FOR SELECT
USING (public.has_role(auth.uid(), 'ik'));

CREATE POLICY "Ust yonetici can view all career paths"
ON public.career_paths FOR SELECT
USING (public.has_role(auth.uid(), 'ust_yonetici'));

-- Career nodes policies (inherit from path access)
CREATE POLICY "Users can view own career nodes"
ON public.career_nodes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.career_paths cp
    WHERE cp.id = career_path_id AND cp.employee_user_id = auth.uid()
  )
);

CREATE POLICY "Managers can view team career nodes"
ON public.career_nodes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.career_paths cp
    WHERE cp.id = career_path_id AND public.is_manager_of(auth.uid(), cp.employee_user_id)
  )
);

CREATE POLICY "IK can view all career nodes"
ON public.career_nodes FOR SELECT
USING (public.has_role(auth.uid(), 'ik'));

CREATE POLICY "Ust yonetici can view all career nodes"
ON public.career_nodes FOR SELECT
USING (public.has_role(auth.uid(), 'ust_yonetici'));

CREATE POLICY "Managers+ can insert career nodes"
ON public.career_nodes FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

CREATE POLICY "Managers+ can update career nodes"
ON public.career_nodes FOR UPDATE
USING (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

CREATE POLICY "Managers+ can delete career nodes"
ON public.career_nodes FOR DELETE
USING (
  public.has_role(auth.uid(), 'yonetici') OR
  public.has_role(auth.uid(), 'ust_yonetici') OR
  public.has_role(auth.uid(), 'ik')
);

-- Timestamp trigger
CREATE TRIGGER update_career_paths_updated_at
BEFORE UPDATE ON public.career_paths
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_career_nodes_updated_at
BEFORE UPDATE ON public.career_nodes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
