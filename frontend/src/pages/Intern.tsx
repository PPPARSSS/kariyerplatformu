import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  FolderOpen, BookOpen, Target, CheckCircle2, Clock, Upload, Users,
  Plus, Trash2, Edit, Award, MessageSquare, Send, Bot, FileText,
  GraduationCap, BarChart3, Settings2, Star,
} from "lucide-react";

type ChatMsg = { role: "user" | "assistant"; content: string };

const API_URL = "http://localhost:3000/api";

export default function InternPage() {
  const { user, roles, isAtLeast } = useAuth();
  const queryClient = useQueryClient();
  const isManager = isAtLeast("takim_lideri");

  // === Data queries ===
  const { data: programs = [] } = useQuery({
    queryKey: ["intern-programs"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/interns/programs`);
      if (!res.ok) throw new Error("Failed to fetch programs");
      return res.json();
    },
  });

  const { data: lessons = [] } = useQuery({
    queryKey: ["intern-lessons"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/interns/lessons`);
      if (!res.ok) throw new Error("Failed to fetch lessons");
      return res.json();
    },
  });

  const { data: evaluations = [] } = useQuery({
    queryKey: ["intern-evaluations"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/interns/evaluations`);
      if (!res.ok) throw new Error("Failed to fetch evaluations");
      return res.json();
    },
  });

  const { data: evalParams = [] } = useQuery({
    queryKey: ["evaluation-parameters"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/interns/evaluation-parameters`);
      if (!res.ok) throw new Error("Failed to fetch parameters");
      return res.json();
    },
  });

  const { data: procedures = [] } = useQuery({
    queryKey: ["procedures"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/procedures`);
      if (!res.ok) throw new Error("Failed to fetch procedures");
      return res.json();
    },
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ["intern-assignments"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/interns/assignments`);
      if (!res.ok) throw new Error("Failed to fetch assignments");
      return res.json();
    },
  });

  const { data: allProfiles = [] } = useQuery({
    queryKey: ["all-profiles-intern"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/profiles`);
      if (!res.ok) throw new Error("Failed to fetch profiles");
      return res.json();
    },
    enabled: isManager,
  });

  // === Dialogs ===
  const [showProgramDialog, setShowProgramDialog] = useState(false);
  const [showLessonDialog, setShowLessonDialog] = useState(false);
  const [showEvalDialog, setShowEvalDialog] = useState(false);
  const [showParamDialog, setShowParamDialog] = useState(false);
  const [showProcedureDialog, setShowProcedureDialog] = useState(false);

  // === Form states ===
  const [programForm, setProgramForm] = useState({ title: "", description: "", start_date: "", end_date: "" });
  const [lessonForm, setLessonForm] = useState({ title: "", content: "", lesson_type: "ders", program_id: "", order_index: 0 });
  const [evalForm, setEvalForm] = useState({ title: "", evaluation_type: "custom", score: "", max_score: "100", notes: "", intern_user_id: "", program_id: "", parameter_id: "" });
  const [paramForm, setParamForm] = useState({ name: "", weight: "1", max_score: "100", program_id: "" });
  const [procedureForm, setProcedureForm] = useState({ title: "", content: "", category: "" });

  // === Chat state ===
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // === Mutations ===
  const addProgram = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/interns/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...programForm, created_by: user!.id })
      });
      if (!res.ok) throw new Error("Program eklenemedi");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["intern-programs"] }); setShowProgramDialog(false); setProgramForm({ title: "", description: "", start_date: "", end_date: "" }); toast.success("Program eklendi"); },
    onError: (e: any) => toast.error(e.message),
  });

  const addLesson = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/interns/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lessonForm, order_index: Number(lessonForm.order_index), created_by: user!.id })
      });
      if (!res.ok) throw new Error("Ders eklenemedi");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["intern-lessons"] }); setShowLessonDialog(false); setLessonForm({ title: "", content: "", lesson_type: "ders", program_id: "", order_index: 0 }); toast.success("Ders eklendi"); },
    onError: (e: any) => toast.error(e.message),
  });

  const addEval = useMutation({
    mutationFn: async () => {
      const payload: any = {
        title: evalForm.title,
        evaluation_type: evalForm.evaluation_type,
        score: evalForm.score ? Number(evalForm.score) : null,
        max_score: Number(evalForm.max_score),
        notes: evalForm.notes || null,
        intern_user_id: evalForm.intern_user_id,
        program_id: evalForm.program_id,
        evaluated_by: user!.id,
      };
      if (evalForm.parameter_id) payload.parameter_id = evalForm.parameter_id;
      const res = await fetch(`${API_URL}/interns/evaluations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Değerlendirme eklenemedi");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["intern-evaluations"] }); setShowEvalDialog(false); setEvalForm({ title: "", evaluation_type: "custom", score: "", max_score: "100", notes: "", intern_user_id: "", program_id: "", parameter_id: "" }); toast.success("Değerlendirme eklendi"); },
    onError: (e: any) => toast.error(e.message),
  });

  const addParam = useMutation({
    mutationFn: async () => {
      const payload = { name: paramForm.name, weight: Number(paramForm.weight), max_score: Number(paramForm.max_score), program_id: paramForm.program_id, created_by: user!.id };
      const res = await fetch(`${API_URL}/interns/evaluation-parameters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Parametre eklenemedi");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["evaluation-parameters"] }); setShowParamDialog(false); setParamForm({ name: "", weight: "1", max_score: "100", program_id: "" }); toast.success("Parametre eklendi"); },
    onError: (e: any) => toast.error(e.message),
  });

  const addProcedure = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/procedures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...procedureForm, created_by: user!.id })
      });
      if (!res.ok) throw new Error("Prosedür eklenemedi");
      return res.json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["procedures"] }); setShowProcedureDialog(false); setProcedureForm({ title: "", content: "", category: "" }); toast.success("Prosedür eklendi"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteItem = async (table: string, id: string, queryKey: string) => {
    let endpoint = "";
    if (table === "procedures") endpoint = `${API_URL}/procedures/${id}`;
    else endpoint = `${API_URL}/interns/${table}/${id}`;

    const res = await fetch(endpoint, { method: 'DELETE' });
    if (!res.ok) {
      toast.error("Silme işlemi başarısız"); return;
    }
    queryClient.invalidateQueries({ queryKey: [queryKey] });
    toast.success("Silindi");
  };

  // === Chat ===
  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg: ChatMsg = { role: "user", content: chatInput.trim() };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    let assistantSoFar = "";
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/procedure-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Bağlantı hatası" }));
        toast.error(err.error || "Bir hata oluştu");
        setChatLoading(false);
        return;
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setChatMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Chatbot bağlantı hatası");
    }
    setChatLoading(false);
  };

  const evalTypes = [
    { value: "kahoot_quiz", label: "Kahoot Quiz" },
    { value: "staj_raporu", label: "Staj Raporu" },
    { value: "proje_notu", label: "Proje Notu" },
    { value: "sunum", label: "Sunum Değerlendirme" },
    { value: "custom", label: "Özel Parametre" },
  ];

  const lessonTypes = [
    { value: "ders", label: "Ders" },
    { value: "sunum", label: "Sunum" },
    { value: "not", label: "Not" },
    { value: "odev", label: "Ödev" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Stajyer Portalı</h1>
            <p className="mt-1 text-muted-foreground">Staj programları, değerlendirmeler ve prosedürler (Backend Bağlantılı Server Versiyonu)</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><GraduationCap className="h-6 w-6 text-primary" /></div>
              <div><p className="text-2xl font-bold">{programs.length}</p><p className="text-sm text-muted-foreground">Program</p></div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-accent/10 p-3"><BookOpen className="h-6 w-6 text-accent" /></div>
              <div><p className="text-2xl font-bold">{lessons.length}</p><p className="text-sm text-muted-foreground">Ders/Sunum</p></div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-warning/10 p-3"><BarChart3 className="h-6 w-6 text-warning" /></div>
              <div><p className="text-2xl font-bold">{evaluations.length}</p><p className="text-sm text-muted-foreground">Değerlendirme</p></div>
            </CardContent>
          </Card>
          <Card variant="stats">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="rounded-xl bg-success/10 p-3"><FileText className="h-6 w-6 text-success" /></div>
              <div><p className="text-2xl font-bold">{procedures.length}</p><p className="text-sm text-muted-foreground">Prosedür</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="programs" className="space-y-4">
          <TabsList className="flex flex-wrap gap-1">
            <TabsTrigger value="programs"><GraduationCap className="h-4 w-4 mr-1" />Programlar</TabsTrigger>
            <TabsTrigger value="lessons"><BookOpen className="h-4 w-4 mr-1" />Dersler</TabsTrigger>
            <TabsTrigger value="evaluations"><BarChart3 className="h-4 w-4 mr-1" />Değerlendirmeler</TabsTrigger>
            <TabsTrigger value="procedures"><FileText className="h-4 w-4 mr-1" />Prosedürler</TabsTrigger>
            <TabsTrigger value="chatbot"><Bot className="h-4 w-4 mr-1" />Prosedür Asistanı</TabsTrigger>
          </TabsList>

          {/* === Programs Tab === */}
          <TabsContent value="programs" className="space-y-4">
            {isManager && (
              <Button onClick={() => setShowProgramDialog(true)}><Plus className="h-4 w-4 mr-2" />Program Ekle</Button>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {programs.map((p: any) => (
                <Card key={p.id} variant="glass">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                      {isManager && (
                        <Button size="icon" variant="ghost" onClick={() => deleteItem("intern_programs", p.id, "intern-programs")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {p.description && <p className="text-sm text-muted-foreground mb-2">{p.description}</p>}
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      {p.start_date && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.start_date}</span>}
                      {p.end_date && <span>→ {p.end_date}</span>}
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline">{lessons.filter((l: any) => l.program_id === p.id).length} ders</Badge>
                      <Badge variant="outline" className="ml-1">{evalParams.filter((ep: any) => ep.program_id === p.id).length} parametre</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {programs.length === 0 && <p className="text-muted-foreground col-span-2 text-center py-8">Henüz program eklenmemiş.</p>}
            </div>
          </TabsContent>

          {/* === Lessons Tab === */}
          <TabsContent value="lessons" className="space-y-4">
            {isManager && (
              <Button onClick={() => setShowLessonDialog(true)}><Plus className="h-4 w-4 mr-2" />Ders / Sunum Ekle</Button>
            )}
            <div className="space-y-3">
              {lessons.map((l: any) => (
                <Card key={l.id} variant="glass">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        {l.lesson_type === "sunum" ? <FolderOpen className="h-5 w-5 text-primary" /> : l.lesson_type === "odev" ? <Target className="h-5 w-5 text-primary" /> : <BookOpen className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium">{l.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-xs">{lessonTypes.find(t => t.value === l.lesson_type)?.label || l.lesson_type}</Badge>
                          {programs.find((p: any) => p.id === l.program_id) && (
                            <span className="text-xs text-muted-foreground">{(programs.find((p: any) => p.id === l.program_id) as any)?.title}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isManager && (
                      <Button size="icon" variant="ghost" onClick={() => deleteItem("intern_lessons", l.id, "intern-lessons")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    )}
                  </CardContent>
                </Card>
              ))}
              {lessons.length === 0 && <p className="text-muted-foreground text-center py-8">Henüz ders eklenmemiş.</p>}
            </div>
          </TabsContent>

          {/* === Evaluations Tab === */}
          <TabsContent value="evaluations" className="space-y-4">
            {isManager && (
              <div className="flex gap-2">
                <Button onClick={() => setShowEvalDialog(true)}><Star className="h-4 w-4 mr-2" />Değerlendirme Ekle</Button>
                <Button variant="outline" onClick={() => setShowParamDialog(true)}><Settings2 className="h-4 w-4 mr-2" />Parametre Ekle</Button>
              </div>
            )}

            {/* Params overview */}
            {evalParams.length > 0 && (
              <Card variant="glass">
                <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Settings2 className="h-4 w-4" />Değerlendirme Parametreleri</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {evalParams.map((ep: any) => (
                      <div key={ep.id} className="flex items-center justify-between p-2 rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium">{ep.name}</p>
                          <p className="text-xs text-muted-foreground">Ağırlık: {ep.weight} · Max: {ep.max_score}</p>
                        </div>
                        {isManager && (
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteItem("evaluation_parameters", ep.id, "evaluation-parameters")}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eval list */}
            <div className="space-y-3">
              {evaluations.map((ev: any) => {
                const profile = allProfiles.find((p: any) => p.user_id === ev.intern_user_id);
                return (
                  <Card key={ev.id} variant="glass">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">{evalTypes.find(t => t.value === ev.evaluation_type)?.label || ev.evaluation_type}</Badge>
                            <span className="font-medium">{ev.title}</span>
                          </div>
                          {profile && <p className="text-sm text-muted-foreground">Stajyer: {profile.full_name}</p>}
                          {ev.score != null && (
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={(ev.score / ev.max_score) * 100} className="h-2 w-32" />
                              <span className="text-sm font-semibold">{ev.score}/{ev.max_score}</span>
                            </div>
                          )}
                          {ev.notes && <p className="text-xs text-muted-foreground mt-1">{ev.notes}</p>}
                        </div>
                        {isManager && (
                          <Button size="icon" variant="ghost" onClick={() => deleteItem("intern_evaluations", ev.id, "intern-evaluations")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {evaluations.length === 0 && <p className="text-muted-foreground text-center py-8">Henüz değerlendirme yapılmamış.</p>}
            </div>
          </TabsContent>

          {/* === Procedures Tab === */}
          <TabsContent value="procedures" className="space-y-4">
            {isManager && (
              <Button onClick={() => setShowProcedureDialog(true)}><Plus className="h-4 w-4 mr-2" />Prosedür Ekle</Button>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {procedures.map((pr: any) => (
                <Card key={pr.id} variant="glass">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{pr.title}</CardTitle>
                      {isManager && (
                        <Button size="icon" variant="ghost" onClick={() => deleteItem("procedures", pr.id, "procedures")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      )}
                    </div>
                    {pr.category && <Badge variant="outline" className="mt-1">{pr.category}</Badge>}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-4">{pr.content}</p>
                  </CardContent>
                </Card>
              ))}
              {procedures.length === 0 && <p className="text-muted-foreground col-span-2 text-center py-8">Henüz prosedür eklenmemiş.</p>}
            </div>
          </TabsContent>

          {/* === Chatbot Tab === */}
          <TabsContent value="chatbot">
            <Card variant="glass" className="h-[600px] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" />Prosedür Asistanı</CardTitle>
                <p className="text-sm text-muted-foreground">İnfina prosedürleri hakkında sorularınızı sorun</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
                  {chatMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                      <Bot className="h-12 w-12 opacity-30" />
                      <p className="text-sm">Prosedürler hakkında bir soru sorun...</p>
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                        ) : msg.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && chatMessages[chatMessages.length - 1]?.role !== "assistant" && (
                    <div className="flex justify-start"><div className="bg-muted rounded-xl px-4 py-2.5 text-sm animate-pulse">Düşünüyor...</div></div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Sorunuzu yazın..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
                    disabled={chatLoading}
                  />
                  <Button onClick={sendChat} disabled={chatLoading || !chatInput.trim()}><Send className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* === Dialogs === */}

      {/* Add Program */}
      <Dialog open={showProgramDialog} onOpenChange={setShowProgramDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Yeni Program</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Başlık</Label><Input value={programForm.title} onChange={e => setProgramForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div><Label>Açıklama</Label><Textarea value={programForm.description} onChange={e => setProgramForm(p => ({ ...p, description: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Başlangıç</Label><Input type="date" value={programForm.start_date} onChange={e => setProgramForm(p => ({ ...p, start_date: e.target.value }))} /></div>
              <div><Label>Bitiş</Label><Input type="date" value={programForm.end_date} onChange={e => setProgramForm(p => ({ ...p, end_date: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={() => addProgram.mutate()} disabled={!programForm.title || addProgram.isPending}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lesson */}
      <Dialog open={showLessonDialog} onOpenChange={setShowLessonDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Ders / Sunum Ekle</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Program</Label>
              <Select value={lessonForm.program_id} onValueChange={v => setLessonForm(l => ({ ...l, program_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Program seçin" /></SelectTrigger>
                <SelectContent>{programs.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Başlık</Label><Input value={lessonForm.title} onChange={e => setLessonForm(l => ({ ...l, title: e.target.value }))} /></div>
            <div><Label>Tür</Label>
              <Select value={lessonForm.lesson_type} onValueChange={v => setLessonForm(l => ({ ...l, lesson_type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{lessonTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>İçerik / Notlar</Label><Textarea value={lessonForm.content} onChange={e => setLessonForm(l => ({ ...l, content: e.target.value }))} /></div>
            <div><Label>Sıra</Label><Input type="number" value={lessonForm.order_index} onChange={e => setLessonForm(l => ({ ...l, order_index: Number(e.target.value) }))} /></div>
          </div>
          <DialogFooter><Button onClick={() => addLesson.mutate()} disabled={!lessonForm.title || !lessonForm.program_id || addLesson.isPending}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Evaluation */}
      <Dialog open={showEvalDialog} onOpenChange={setShowEvalDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Değerlendirme Ekle</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Program</Label>
              <Select value={evalForm.program_id} onValueChange={v => setEvalForm(e => ({ ...e, program_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Program seçin" /></SelectTrigger>
                <SelectContent>{programs.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Stajyer</Label>
              <Select value={evalForm.intern_user_id} onValueChange={v => setEvalForm(e => ({ ...e, intern_user_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Stajyer seçin" /></SelectTrigger>
                <SelectContent>{allProfiles.map((p: any) => <SelectItem key={p.user_id} value={p.user_id}>{p.full_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Tür</Label>
              <Select value={evalForm.evaluation_type} onValueChange={v => setEvalForm(e => ({ ...e, evaluation_type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{evalTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {evalForm.evaluation_type === "custom" && evalParams.filter((ep: any) => ep.program_id === evalForm.program_id).length > 0 && (
              <div><Label>Parametre</Label>
                <Select value={evalForm.parameter_id} onValueChange={v => setEvalForm(e => ({ ...e, parameter_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Parametre seçin (opsiyonel)" /></SelectTrigger>
                  <SelectContent>{evalParams.filter((ep: any) => ep.program_id === evalForm.program_id).map((ep: any) => <SelectItem key={ep.id} value={ep.id}>{ep.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            <div><Label>Başlık</Label><Input value={evalForm.title} onChange={e => setEvalForm(ev => ({ ...ev, title: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Puan</Label><Input type="number" value={evalForm.score} onChange={e => setEvalForm(ev => ({ ...ev, score: e.target.value }))} /></div>
              <div><Label>Maks Puan</Label><Input type="number" value={evalForm.max_score} onChange={e => setEvalForm(ev => ({ ...ev, max_score: e.target.value }))} /></div>
            </div>
            <div><Label>Notlar</Label><Textarea value={evalForm.notes} onChange={e => setEvalForm(ev => ({ ...ev, notes: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={() => addEval.mutate()} disabled={!evalForm.title || !evalForm.intern_user_id || !evalForm.program_id || addEval.isPending}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Parameter */}
      <Dialog open={showParamDialog} onOpenChange={setShowParamDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Değerlendirme Parametresi Ekle</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Program</Label>
              <Select value={paramForm.program_id} onValueChange={v => setParamForm(p => ({ ...p, program_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Program seçin" /></SelectTrigger>
                <SelectContent>{programs.map((p: any) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Parametre Adı</Label><Input value={paramForm.name} onChange={e => setParamForm(p => ({ ...p, name: e.target.value }))} placeholder="Örn: Teknik Bilgi, İletişim, Sunum" /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Ağırlık</Label><Input type="number" value={paramForm.weight} onChange={e => setParamForm(p => ({ ...p, weight: e.target.value }))} /></div>
              <div><Label>Maks Puan</Label><Input type="number" value={paramForm.max_score} onChange={e => setParamForm(p => ({ ...p, max_score: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={() => addParam.mutate()} disabled={!paramForm.name || !paramForm.program_id || addParam.isPending}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Procedure */}
      <Dialog open={showProcedureDialog} onOpenChange={setShowProcedureDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Prosedür Ekle</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Başlık</Label><Input value={procedureForm.title} onChange={e => setProcedureForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div><Label>Kategori</Label><Input value={procedureForm.category} onChange={e => setProcedureForm(p => ({ ...p, category: e.target.value }))} placeholder="Örn: İK, BT, Güvenlik" /></div>
            <div><Label>İçerik</Label><Textarea rows={8} value={procedureForm.content} onChange={e => setProcedureForm(p => ({ ...p, content: e.target.value }))} placeholder="Prosedür içeriğini buraya yazın..." /></div>
          </div>
          <DialogFooter><Button onClick={() => addProcedure.mutate()} disabled={!procedureForm.title || !procedureForm.content || addProcedure.isPending}>Kaydet</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
