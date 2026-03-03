import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import API_BASE_URL from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Shield, Edit, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AppRole = 'stajyer' | 'personel' | 'takim_lideri' | 'yonetici' | 'ust_yonetici' | 'ik';

interface UserWithRoles {
    user_id: string;
    full_name: string;
    department: string | null;
    position: string | null;
    avatar_url: string | null;
    roles: AppRole[];
}

const ALL_ROLES: { value: AppRole; label: string }[] = [
    { value: "stajyer", label: "Stajyer" },
    { value: "personel", label: "Personel" },
    { value: "takim_lideri", label: "Takım Lideri" },
    { value: "yonetici", label: "Yönetici" },
    { value: "ust_yonetici", label: "Süper Yönetici" },
    { value: "ik", label: "İK" },
];

const roleBadgeColor: Record<AppRole, string> = {
    stajyer: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    personel: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    takim_lideri: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    yonetici: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    ust_yonetici: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    ik: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
};

export default function AdminUsers() {
    const [users, setUsers] = useState<UserWithRoles[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUser, setEditingUser] = useState<UserWithRoles | null>(null);
    const [editRoles, setEditRoles] = useState<AppRole[]>([]);
    const [saving, setSaving] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { toast } = useToast();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE_URL}/users`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (e) {
            console.error(e);
            toast({ title: "Hata", description: "Kullanıcılar yüklenirken bir hata oluştu.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditRoles = (user: UserWithRoles) => {
        setEditingUser(user);
        setEditRoles([...user.roles]);
        setDialogOpen(true);
    };

    const toggleRole = (role: AppRole) => {
        setEditRoles((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
    };

    const handleSaveRoles = async () => {
        if (!editingUser) return;
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE_URL}/users/${editingUser.user_id}/roles`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roles: editRoles }),
            });
            if (res.ok) {
                toast({ title: "Başarılı", description: `${editingUser.full_name} rolleri güncellendi.` });
                setDialogOpen(false);
                fetchUsers(); // Refresh list
            } else {
                toast({ title: "Hata", description: "Roller güncellenirken bir hata oluştu.", variant: "destructive" });
            }
        } catch (e) {
            console.error(e);
            toast({ title: "Hata", description: "Sunucu bağlantı hatası.", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-card/90 to-card/40 border shadow-lg backdrop-blur-xl flex items-center transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent z-10" />
                    <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
                    <div className="relative z-20 flex w-full flex-col gap-4 p-8 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-3">
                                <Shield className="h-4 w-4" />
                                <span>Süper Yönetici Paneli</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                                Kullanıcı Yönetimi
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Kullanıcı rollerini ve erişim izinlerini buradan yönetebilirsiniz.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-card/60 backdrop-blur-md border px-4 py-3 shadow-sm">
                            <Users className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-2xl font-bold text-foreground">{users.length}</p>
                                <p className="text-xs text-muted-foreground">Toplam Kullanıcı</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Kullanıcı, departman veya pozisyon ara..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Users List */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredUsers.map((u) => {
                            const initials = u.full_name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2) || "?";
                            return (
                                <Card key={u.user_id} variant="glass" className="group/card transition-all hover:shadow-lg hover:shadow-primary/5">
                                    <CardContent className="p-5">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                <AvatarImage src={u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.user_id}`} />
                                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground truncate">{u.full_name || "İsimsiz"}</h3>
                                                <p className="text-sm text-muted-foreground truncate">{u.position || u.department || "Belirlenmemiş"}</p>
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {u.roles.length > 0 ? (
                                                        u.roles.map((r) => (
                                                            <span key={r} className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${roleBadgeColor[r] || "bg-gray-100 text-gray-600"}`}>
                                                                {ALL_ROLES.find(ar => ar.value === r)?.label || r}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground italic">Rol atanmamış</span>
                                                    )}
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="opacity-0 group-hover/card:opacity-100 transition-opacity"
                                                onClick={() => handleEditRoles(u)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Edit Roles Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Rolleri Düzenle</DialogTitle>
                            <DialogDescription>
                                {editingUser?.full_name || "Kullanıcı"} için rolleri seçin
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3 py-4">
                            {ALL_ROLES.map((role) => (
                                <label
                                    key={role.value}
                                    className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                                >
                                    <Checkbox
                                        checked={editRoles.includes(role.value)}
                                        onCheckedChange={() => toggleRole(role.value)}
                                    />
                                    <div className="flex-1">
                                        <span className="font-medium text-sm">{role.label}</span>
                                    </div>
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${roleBadgeColor[role.value]}`}>
                                        {role.value}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
                            <Button variant="gradient" onClick={handleSaveRoles} disabled={saving}>
                                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {saving ? "Kaydediliyor..." : "Kaydet"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </MainLayout>
    );
}
