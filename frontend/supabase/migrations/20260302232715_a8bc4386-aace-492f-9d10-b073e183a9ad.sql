
-- Intern Programs
CREATE TABLE public.intern_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.intern_programs ENABLE ROW LEVEL SECURITY;

-- Intern Lessons (ders, sunum, not)
CREATE TABLE public.intern_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES public.intern_programs(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  lesson_type TEXT NOT NULL DEFAULT 'ders',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.intern_lessons ENABLE ROW LEVEL SECURITY;

-- Evaluation Parameters (custom scoring criteria per program)
CREATE TABLE public.evaluation_parameters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES public.intern_programs(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  weight NUMERIC NOT NULL DEFAULT 1,
  max_score NUMERIC NOT NULL DEFAULT 100,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.evaluation_parameters ENABLE ROW LEVEL SECURITY;

-- Intern Evaluations (quiz, report, project, custom)
CREATE TABLE public.intern_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intern_user_id UUID NOT NULL,
  program_id UUID REFERENCES public.intern_programs(id) ON DELETE CASCADE NOT NULL,
  parameter_id UUID REFERENCES public.evaluation_parameters(id) ON DELETE SET NULL,
  evaluation_type TEXT NOT NULL DEFAULT 'custom',
  title TEXT NOT NULL,
  score NUMERIC,
  max_score NUMERIC NOT NULL DEFAULT 100,
  notes TEXT,
  evaluated_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.intern_evaluations ENABLE ROW LEVEL SECURITY;

-- Program-Intern assignment
CREATE TABLE public.intern_program_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES public.intern_programs(id) ON DELETE CASCADE NOT NULL,
  intern_user_id UUID NOT NULL,
  assigned_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(program_id, intern_user_id)
);
ALTER TABLE public.intern_program_assignments ENABLE ROW LEVEL SECURITY;

-- Procedures (company procedures for AI chatbot)
CREATE TABLE public.procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;

-- === RLS POLICIES ===

-- intern_programs: managers+ can CRUD, everyone authenticated can read
CREATE POLICY "Authenticated can view programs" ON public.intern_programs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers+ can insert programs" ON public.intern_programs FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can update programs" ON public.intern_programs FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete programs" ON public.intern_programs FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- intern_lessons
CREATE POLICY "Authenticated can view lessons" ON public.intern_lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers+ can insert lessons" ON public.intern_lessons FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can update lessons" ON public.intern_lessons FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete lessons" ON public.intern_lessons FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- evaluation_parameters
CREATE POLICY "Authenticated can view parameters" ON public.evaluation_parameters FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers+ can insert parameters" ON public.evaluation_parameters FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can update parameters" ON public.evaluation_parameters FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete parameters" ON public.evaluation_parameters FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- intern_evaluations
CREATE POLICY "Interns can view own evaluations" ON public.intern_evaluations FOR SELECT TO authenticated USING (auth.uid() = intern_user_id);
CREATE POLICY "Managers+ can view all evaluations" ON public.intern_evaluations FOR SELECT TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can insert evaluations" ON public.intern_evaluations FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can update evaluations" ON public.intern_evaluations FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete evaluations" ON public.intern_evaluations FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- intern_program_assignments
CREATE POLICY "Interns can view own assignments" ON public.intern_program_assignments FOR SELECT TO authenticated USING (auth.uid() = intern_user_id);
CREATE POLICY "Managers+ can view all assignments" ON public.intern_program_assignments FOR SELECT TO authenticated USING (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can insert assignments" ON public.intern_program_assignments FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'takim_lideri'::app_role) OR has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete assignments" ON public.intern_program_assignments FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- procedures: everyone can read, managers+ can write
CREATE POLICY "Authenticated can view procedures" ON public.procedures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Managers+ can insert procedures" ON public.procedures FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can update procedures" ON public.procedures FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));
CREATE POLICY "Managers+ can delete procedures" ON public.procedures FOR DELETE TO authenticated USING (has_role(auth.uid(), 'yonetici'::app_role) OR has_role(auth.uid(), 'ust_yonetici'::app_role) OR has_role(auth.uid(), 'ik'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_intern_programs_updated_at BEFORE UPDATE ON public.intern_programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_intern_lessons_updated_at BEFORE UPDATE ON public.intern_lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_intern_evaluations_updated_at BEFORE UPDATE ON public.intern_evaluations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_procedures_updated_at BEFORE UPDATE ON public.procedures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
