import { useState, useRef, useCallback, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Trash2, Save, GripVertical, BookOpen, Code, Award,
  ClipboardList, Target, Milestone, ChevronDown, ChevronRight,
  Clock, Zap, AlertTriangle, CheckCircle2, Lock, Play, Users,
  Edit3, ArrowRight, FileText, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const API_URL = "http://localhost:3000/api";

// --- Types ---
interface CareerNode {
  id: string;
  career_path_id: string;
  parent_node_id: string | null;
  title: string;
  node_type: string;
  status: string;
  priority: number;
  difficulty: string;
  description: string | null;
  requirements: string | null;
  resources: string | null;
  estimated_hours: number | null;
  position_x: number;
  position_y: number;
  children?: CareerNode[];
}

interface CareerPath {
  id: string;
  employee_user_id: string;
  created_by: string;
  title: string;
  description: string | null;
}

const NODE_TYPES = [
  { value: "skill", label: "Yetkinlik", icon: Target, color: "text-primary" },
  { value: "training", label: "Eğitim", icon: BookOpen, color: "text-info" },
  { value: "project", label: "Proje", icon: Code, color: "text-accent" },
  { value: "exam", label: "Sınav", icon: ClipboardList, color: "text-warning" },
  { value: "assignment", label: "Ödev", icon: FileText, color: "text-muted-foreground" },
  { value: "milestone", label: "Kilometre Taşı", icon: Milestone, color: "text-success" },
];

const DIFFICULTY_MAP: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  kolay: { label: "Kolay", color: "bg-success/10 text-success border-success/30", icon: Zap },
  orta: { label: "Orta", color: "bg-warning/10 text-warning border-warning/30", icon: Clock },
  zor: { label: "Zor", color: "bg-destructive/10 text-destructive border-destructive/30", icon: AlertTriangle },
  ileri: { label: "İleri", color: "bg-primary/10 text-primary border-primary/30", icon: Star },
};

const STATUS_MAP: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  locked: { label: "Kilitli", icon: Lock, color: "text-muted-foreground" },
  in_progress: { label: "Devam Ediyor", icon: Play, color: "text-primary" },
  completed: { label: "Tamamlandı", icon: CheckCircle2, color: "text-success" },
};

// --- Helper: Build tree from flat list ---
function buildTree(nodes: CareerNode[]): CareerNode[] {
  const map = new Map<string, CareerNode>();
  const roots: CareerNode[] = [];
  nodes.forEach((n) => map.set(n.id, { ...n, children: [] }));
  nodes.forEach((n) => {
    const node = map.get(n.id)!;
    if (n.parent_node_id && map.has(n.parent_node_id)) {
      map.get(n.parent_node_id)!.children!.push(node);
    } else {
      roots.push(node);
    }
  });
  // Sort children by priority
  const sortChildren = (nodes: CareerNode[]) => {
    nodes.sort((a, b) => a.priority - b.priority);
    nodes.forEach((n) => n.children && sortChildren(n.children));
  };
  sortChildren(roots);
  return roots;
}

// --- Draggable Node Component ---
function TreeNodeCard({
  node, depth = 0, onSelect, onAddChild, onDelete, onDragStart, onDrop, dragOverId,
}: {
  node: CareerNode;
  depth?: number;
  onSelect: (node: CareerNode) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (targetId: string) => void;
  dragOverId: string | null;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const typeInfo = NODE_TYPES.find((t) => t.value === node.node_type) || NODE_TYPES[0];
  const StatusIcon = STATUS_MAP[node.status]?.icon || Lock;
  const statusColor = STATUS_MAP[node.status]?.color || "text-muted-foreground";
  const diffInfo = DIFFICULTY_MAP[node.difficulty || "orta"];

  return (
    <div className="relative">
      <div
        draggable
        onDragStart={(e) => { e.stopPropagation(); onDragStart(node.id); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onDrop(node.id); }}
        className={cn(
          "group flex items-center gap-2 rounded-lg border bg-card p-3 transition-all hover:shadow-md cursor-grab active:cursor-grabbing",
          dragOverId === node.id && "ring-2 ring-primary/50 bg-primary/5",
          node.status === "completed" && "opacity-70"
        )}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />

        {hasChildren ? (
          <button onClick={() => setExpanded(!expanded)} className="shrink-0">
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        ) : (
          <div className="w-4" />
        )}

        <div className={cn("rounded-lg p-1.5 shrink-0", typeInfo.color, "bg-current/10")}>
          <typeInfo.icon className={cn("h-4 w-4", typeInfo.color)} />
        </div>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(node)}>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{node.title}</span>
            <StatusIcon className={cn("h-3.5 w-3.5 shrink-0", statusColor)} />
          </div>
          {node.description && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{node.description}</p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {diffInfo && (
            <Badge variant="outline" className={cn("text-xs px-1.5 py-0", diffInfo.color)}>
              {diffInfo.label}
            </Badge>
          )}
          {node.estimated_hours && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {node.estimated_hours}sa
            </Badge>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onAddChild(node.id)}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDelete(node.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="ml-8 mt-1 space-y-1 border-l-2 border-border/50 pl-3">
          {node.children!.map((child) => (
            <TreeNodeCard
              key={child.id}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDrop={onDrop}
              dragOverId={dragOverId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Node Detail Dialog ---
function NodeDetailDialog({
  node, open, onOpenChange, onSave,
}: {
  node: CareerNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: Partial<CareerNode>) => void;
}) {
  const [form, setForm] = useState({
    title: "", node_type: "skill", status: "locked", difficulty: "orta",
    description: "", requirements: "", resources: "", estimated_hours: 0,
  });

  useEffect(() => {
    if (node) {
      setForm({
        title: node.title,
        node_type: node.node_type,
        status: node.status,
        difficulty: node.difficulty || "orta",
        description: node.description || "",
        requirements: node.requirements || "",
        resources: node.resources || "",
        estimated_hours: node.estimated_hours || 0,
      });
    }
  }, [node]);

  const typeInfo = NODE_TYPES.find((t) => t.value === form.node_type) || NODE_TYPES[0];
  const diffInfo = DIFFICULTY_MAP[form.difficulty];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={cn("rounded-xl p-2.5", typeInfo.color, "bg-current/10")}>
              <typeInfo.icon className={cn("h-6 w-6", typeInfo.color)} />
            </div>
            <div>
              <DialogTitle className="text-xl">{node ? "Node Düzenle" : "Yeni Node"}</DialogTitle>
              <DialogDescription>
                Kariyer ağacındaki bu adımın detaylarını belirleyin
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Başlık</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Örn: React Advanced Patterns" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Tür</Label>
              <Select value={form.node_type} onValueChange={(v) => setForm({ ...form, node_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {NODE_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <span className="flex items-center gap-2">
                        <t.icon className={cn("h-4 w-4", t.color)} />
                        {t.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_MAP).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      <span className="flex items-center gap-2">
                        <v.icon className={cn("h-4 w-4", v.color)} />
                        {v.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Zorluk</Label>
              <Select value={form.difficulty} onValueChange={(v) => setForm({ ...form, difficulty: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(DIFFICULTY_MAP).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      <span className="flex items-center gap-2">
                        <v.icon className={cn("h-4 w-4")} />
                        {v.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tahmini Süre (saat)</Label>
            <Input type="number" value={form.estimated_hours} onChange={(e) => setForm({ ...form, estimated_hours: Number(e.target.value) })} />
          </div>

          <div className="space-y-2">
            <Label>Açıklama</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Bu adımda neler yapılacak?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Gereksinimler & Beklentiler</Label>
            <Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} placeholder="Bu node'u tamamlamak için neler bekleniyor?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label>Kaynaklar & Materyaller</Label>
            <Textarea value={form.resources} onChange={(e) => setForm({ ...form, resources: e.target.value })} placeholder="Eğitim linkleri, dokümanlar, videolar..." rows={2} />
          </div>

          {/* Info card preview */}
          <Card variant="stats" className="mt-4">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Önizleme</p>
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("rounded-lg p-2", typeInfo.color, "bg-current/10")}>
                  <typeInfo.icon className={cn("h-5 w-5", typeInfo.color)} />
                </div>
                <div>
                  <p className="font-semibold">{form.title || "Başlık giriniz"}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className={cn("text-xs", diffInfo?.color)}>{diffInfo?.label}</Badge>
                    {form.estimated_hours > 0 && <Badge variant="secondary" className="text-xs">{form.estimated_hours} saat</Badge>}
                    <Badge variant="outline" className="text-xs">{typeInfo.label}</Badge>
                  </div>
                </div>
              </div>
              {form.description && <p className="text-sm text-muted-foreground">{form.description}</p>}
              {form.requirements && (
                <div className="mt-2 p-2 rounded bg-muted/50 text-sm">
                  <p className="font-medium text-xs text-muted-foreground mb-1">Beklentiler:</p>
                  <p className="text-foreground">{form.requirements}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>İptal</Button>
          <Button onClick={() => { onSave(form); onOpenChange(false); }}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Main Page ---
export default function CareerPathEditorPage() {
  const { user, isAtLeast } = useAuth();
  const { toast } = useToast();
  const canEdit = isAtLeast("yonetici");

  // State
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<CareerNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addingChildOf, setAddingChildOf] = useState<string | null>(null);
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // New path form
  const [showNewPath, setShowNewPath] = useState(false);
  const [newPathTitle, setNewPathTitle] = useState("");
  const [newPathEmployeeId, setNewPathEmployeeId] = useState("");
  const [employees, setEmployees] = useState<{ user_id: string; full_name: string }[]>([]);

  // Fetch paths
  const fetchPaths = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/careers/paths`);
      if (!res.ok) throw new Error("Failed to fetch paths");
      const data = await res.json();
      setPaths(data);
    } catch (e) {
      toast({ title: "Hata", description: "Kariyer yolları yüklenemedi", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Fetch nodes for selected path
  const fetchNodes = useCallback(async (pathId: string) => {
    try {
      const res = await fetch(`${API_URL}/careers/nodes?pathId=${pathId}`);
      if (!res.ok) throw new Error("Failed to fetch nodes");
      const data = await res.json();
      setNodes(data);
    } catch (e) {
      toast({ title: "Hata", description: "Kariyer adımları yüklenemedi", variant: "destructive" });
    }
  }, [toast]);

  // Fetch employees for dropdown
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/users/profiles`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchPaths();
    if (canEdit) fetchEmployees();
  }, [fetchPaths, fetchEmployees, canEdit]);

  useEffect(() => {
    if (selectedPathId) fetchNodes(selectedPathId);
    else setNodes([]);
  }, [selectedPathId, fetchNodes]);

  // Create new path
  const handleCreatePath = async () => {
    if (!newPathTitle || !newPathEmployeeId || !user) return;
    try {
      const res = await fetch(`${API_URL}/careers/paths`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPathTitle,
          employee_user_id: newPathEmployeeId,
          created_by: user.id,
        })
      });
      if (!res.ok) throw new Error((await res.json()).error || "Oluşturulamadı");
      const data = await res.json();
      toast({ title: "Başarılı", description: "Kariyer yolu oluşturuldu" });
      setShowNewPath(false);
      setNewPathTitle("");
      fetchPaths();
      if (data) setSelectedPathId(data.id);
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  };

  // Add node
  const handleAddNode = async (parentId: string | null) => {
    if (!selectedPathId || !user) return;
    const maxPriority = nodes.filter((n) => n.parent_node_id === parentId).length;
    try {
      const res = await fetch(`${API_URL}/careers/nodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career_path_id: selectedPathId,
          parent_node_id: parentId,
          title: "Yeni Adım",
          node_type: "skill",
          status: "locked",
          priority: maxPriority,
          position_x: 0,
          position_y: 0,
        })
      });
      if (res.ok) fetchNodes(selectedPathId);
      else throw new Error("Adım oluşturulamadı");
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  };

  // Update node
  const handleUpdateNode = async (updated: Partial<CareerNode>) => {
    if (!selectedNode) return;
    try {
      const res = await fetch(`${API_URL}/careers/nodes/${selectedNode.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      if (res.ok && selectedPathId) {
        fetchNodes(selectedPathId);
        toast({ title: "Kaydedildi" });
      } else throw new Error("Kaydedilemedi");
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  };

  // Delete node
  const handleDeleteNode = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/careers/nodes/${id}`, { method: "DELETE" });
      if (res.ok && selectedPathId) fetchNodes(selectedPathId);
      else throw new Error("Silinemedi");
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    }
  };

  // Drag & drop - reparent node
  const handleDrop = async (targetId: string) => {
    if (!dragNodeId || dragNodeId === targetId) return;
    // Don't allow dropping on own descendant
    const isDescendant = (parentId: string, childId: string): boolean => {
      const children = nodes.filter((n) => n.parent_node_id === parentId);
      return children.some((c) => c.id === childId || isDescendant(c.id, childId));
    };
    if (isDescendant(dragNodeId, targetId)) return;

    try {
      const res = await fetch(`${API_URL}/careers/nodes/${dragNodeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_node_id: targetId })
      });
      if (res.ok && selectedPathId) fetchNodes(selectedPathId);
      else throw new Error("Taşıma işlemi başarısız");
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" });
    } finally {
      setDragNodeId(null);
      setDragOverId(null);
    }
  };

  const tree = buildTree(nodes);
  const selectedPath = paths.find((p) => p.id === selectedPathId);
  const employeeName = employees.find((e) => e.user_id === selectedPath?.employee_user_id)?.full_name;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Kariyer Yolu Editörü</h1>
            <p className="mt-1 text-muted-foreground">
              Çalışanların kariyer ağacını oluşturun, düzenleyin ve önceliklendirin
            </p>
          </div>
          {canEdit && (
            <Button onClick={() => setShowNewPath(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kariyer Yolu
            </Button>
          )}
        </div>

        {/* New Path Dialog */}
        <Dialog open={showNewPath} onOpenChange={setShowNewPath}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Kariyer Yolu Oluştur</DialogTitle>
              <DialogDescription>Bir çalışan seçin ve kariyer yolunu başlatın</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Başlık</Label>
                <Input value={newPathTitle} onChange={(e) => setNewPathTitle(e.target.value)} placeholder="Örn: Frontend Mühendisi Gelişim Yolu" />
              </div>
              <div className="space-y-2">
                <Label>Çalışan</Label>
                <Select value={newPathEmployeeId} onValueChange={setNewPathEmployeeId}>
                  <SelectTrigger><SelectValue placeholder="Çalışan seçin" /></SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => (
                      <SelectItem key={e.user_id} value={e.user_id}>{e.full_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewPath(false)}>İptal</Button>
              <Button onClick={handleCreatePath} disabled={!newPathTitle || !newPathEmployeeId}>Oluştur</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar - Path List */}
          <div className="space-y-3">
            <Card variant="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Kariyer Yolları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : paths.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Henüz kariyer yolu oluşturulmamış
                  </p>
                ) : (
                  paths.map((p) => {
                    const emp = employees.find((e) => e.user_id === p.employee_user_id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPathId(p.id)}
                        className={cn(
                          "w-full text-left rounded-lg p-3 transition-all hover:bg-muted/50",
                          selectedPathId === p.id && "bg-primary/10 ring-1 ring-primary/30"
                        )}
                      >
                        <p className="font-medium text-sm">{p.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{emp?.full_name || "—"}</p>
                      </button>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tree Editor */}
          <div className="lg:col-span-3 space-y-4">
            {selectedPath ? (
              <>
                <Card variant="glass">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Edit3 className="h-5 w-5 text-primary" />
                          {selectedPath.title}
                        </CardTitle>
                        {employeeName && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <Users className="h-3.5 w-3.5 inline mr-1" />
                            {employeeName}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{nodes.length} adım</Badge>
                        <Badge variant="outline" className="text-success border-success/30">
                          {nodes.filter((n) => n.status === "completed").length} tamamlandı
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Tree */}
                <Card>
                  <CardContent className="p-4">
                    {tree.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Target className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground mb-4">Henüz adım eklenmemiş</p>
                        {canEdit && (
                          <Button onClick={() => handleAddNode(null)}>
                            <Plus className="h-4 w-4 mr-2" />
                            İlk Adımı Ekle
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {tree.map((node) => (
                          <TreeNodeCard
                            key={node.id}
                            node={node}
                            onSelect={(n) => { setSelectedNode(n); setDialogOpen(true); }}
                            onAddChild={(parentId) => handleAddNode(parentId)}
                            onDelete={handleDeleteNode}
                            onDragStart={(id) => setDragNodeId(id)}
                            onDrop={handleDrop}
                            dragOverId={dragOverId}
                          />
                        ))}
                        {canEdit && (
                          <Button variant="outline" className="w-full mt-3" onClick={() => handleAddNode(null)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Kök Adım Ekle
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="font-medium">Tür:</span>
                  {NODE_TYPES.map((t) => (
                    <span key={t.value} className="flex items-center gap-1">
                      <t.icon className={cn("h-3.5 w-3.5", t.color)} />
                      {t.label}
                    </span>
                  ))}
                  <span className="ml-4 font-medium">Sürükle & Bırak:</span>
                  <span>Node'u bir başka node'un üzerine sürükleyerek dallandırın</span>
                </div>
              </>
            ) : (
              <Card className="flex flex-col items-center justify-center py-20 text-center">
                <Award className="h-16 w-16 text-muted-foreground/20 mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground">Kariyer Yolu Seçin</h3>
                <p className="text-sm text-muted-foreground mt-1">Sol panelden bir kariyer yolu seçin veya yeni oluşturun</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Node Detail Dialog */}
      <NodeDetailDialog
        node={selectedNode}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleUpdateNode}
      />
    </MainLayout>
  );
}
