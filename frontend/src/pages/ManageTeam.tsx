import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import API_BASE_URL from '@/config/api';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, ShieldAlert, Monitor, UserPlus, Trash2, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface TeamMember {
    user_id: string;
    joined_at: string;
    profiles: {
        full_name: string;
        avatar_url: string;
        department: string;
        position: string;
        experience_years: number;
        hire_date: string;
        seniority_level: string;
    }
}

interface Team {
    id: string;
    name: string;
    manager_id: string;
    members: TeamMember[];
}

export default function ManageTeam() {
    const { user } = useAuth();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');

    // Available users for adding to team
    const [availableUsers, setAvailableUsers] = useState<any[]>([]);
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

    // Editing user profile
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editProfileData, setEditProfileData] = useState({
        experience_years: 0,
        hire_date: '',
        seniority_level: ''
    });

    const fetchTeam = async () => {
        if (!user) return;
        try {
            const res = await fetch(`${API_BASE_URL}/teams/manager/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setTeam(data);
            } else if (res.status === 404) {
                setTeam(null);
            }
        } catch (e) {
            console.error(e);
            toast.error("Ekip bilgileri alınırken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/users`);
            if (res.ok) {
                const data = await res.json();
                setAvailableUsers(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTeam();
        fetchAvailableUsers();
    }, [user]);

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTeamName.trim() || !user) return;
        setIsCreating(true);
        try {
            const res = await fetch(`${API_BASE_URL}/teams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newTeamName, managerId: user.id })
            });
            if (res.ok) {
                toast.success("Ekip başarıyla oluşturuldu.");
                fetchTeam();
            } else {
                toast.error("Ekip oluşturulamadı.");
            }
        } catch (e) {
            console.error(e);
            toast.error("Hata oluştu.");
        } finally {
            setIsCreating(false);
        }
    };

    const handleAddMember = async (targetUserId: string) => {
        if (!team) return;
        try {
            const res = await fetch(`${API_BASE_URL}/teams/${team.id}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: targetUserId })
            });
            if (res.ok) {
                toast.success("Personel ekibe dahil edildi.");
                fetchTeam();
                setIsAddUserDialogOpen(false);
            } else {
                toast.error("Personel eklenemedi.");
            }
        } catch (e) {
            toast.error("Hata oluştu.");
        }
    };

    const handleRemoveMember = async (targetUserId: string) => {
        if (!team) return;
        if (!confirm("Emin misiniz?")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/teams/${team.id}/members/${targetUserId}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                toast.success("Personel ekipten çıkarıldı.");
                fetchTeam();
            } else {
                toast.error("İşlem başarısız.");
            }
        } catch (e) {
            toast.error("Hata oluştu.");
        }
    };

    const handleUpdateProfile = async (targetUserId: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/teams/member/${targetUserId}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editProfileData)
            });
            if (res.ok) {
                toast.success("Personel profili güncellendi.");
                setEditingUserId(null);
                fetchTeam();
            } else {
                toast.error("Profil güncellenemedi.");
            }
        } catch (e) {
            toast.error("Hata oluştu.");
        }
    };


    if (loading) {
        return <div className="p-8 flex items-center justify-center">Yükleniyor...</div>;
    }

    // If no team exists, show creation view
    if (!team) {
        return (
            <div className="container mx-auto p-4 md:p-8 space-y-8 animate-fade-in max-w-2xl mt-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                        <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Ekip Yönetimi</h1>
                    <p className="text-muted-foreground">Şu anda yönettiğiniz bir ekip bulunmuyor. Yeni bir ekip oluşturarak personellerinizi yönetmeye başlayın.</p>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Yeni Ekip Oluştur</CardTitle>
                        <CardDescription>Takımınıza bir isim verin.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateTeam} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="teamName">Ekip İsmi</Label>
                                <Input
                                    id="teamName"
                                    placeholder="Örn: Frontend Geliştirme Takımı"
                                    value={newTeamName}
                                    onChange={(e) => setNewTeamName(e.target.value)}
                                    disabled={isCreating}
                                />
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" disabled={isCreating}>
                                {isCreating ? 'Oluşturuluyor...' : 'Ekibi Oluştur'}
                                <Plus className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // If team exists, show team management
    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {team.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Ekip personellerini yönetin, kıdem ve yetkinlikleri güncelleyin.
                    </p>
                </div>

                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="hover-lift">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Personel Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Personel Ekle</DialogTitle>
                            <DialogDescription>Sistemdeki uygun kullanıcıları ekibinize dahil edin.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin">
                            {availableUsers.filter(u => !team.members.some(m => m.user_id === u.user_id)).map(u => (
                                <div key={u.user_id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{u.full_name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{u.full_name}</p>
                                            <p className="text-xs text-muted-foreground">{u.department || 'Bilinmiyor'}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="ghost" onClick={() => handleAddMember(u.user_id)}>Ekle</Button>
                                </div>
                            ))}
                            {availableUsers.filter(u => !team.members.some(m => m.user_id === u.user_id)).length === 0 && (
                                <p className="text-sm text-center text-muted-foreground">Eklenecek yeni kullanıcı bulunamadı.</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {team.members.map((member) => (
                    <Card key={member.user_id} className="glass-card hover-lift overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-primary to-accent w-full" />
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                                        <AvatarImage src={member.profiles?.avatar_url || ''} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {member.profiles?.full_name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{member.profiles?.full_name}</CardTitle>
                                        <CardDescription>{member.profiles?.position || 'Pozisyon Belirtilmemiş'}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => {
                                        setEditingUserId(member.user_id);
                                        setEditProfileData({
                                            experience_years: member.profiles?.experience_years || 0,
                                            hire_date: member.profiles?.hire_date || '',
                                            seniority_level: member.profiles?.seniority_level || ''
                                        });
                                    }}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveMember(member.user_id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {editingUserId === member.user_id ? (
                                <div className="space-y-4 bg-muted/30 p-4 rounded-lg animate-scale-in">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Deneyim Yılı</Label>
                                        <Input type="number" value={editProfileData.experience_years} onChange={(e) => setEditProfileData({ ...editProfileData, experience_years: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Şirkete Giriş Tarihi</Label>
                                        <Input type="date" value={editProfileData.hire_date} onChange={(e) => setEditProfileData({ ...editProfileData, hire_date: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Kıdem Seviyesi</Label>
                                        <Input type="text" placeholder="Örn: Junior, Mid, Senior" value={editProfileData.seniority_level} onChange={(e) => setEditProfileData({ ...editProfileData, seniority_level: e.target.value })} />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" className="w-full" onClick={() => handleUpdateProfile(member.user_id)}>Kaydet</Button>
                                        <Button size="sm" variant="outline" className="w-full" onClick={() => setEditingUserId(null)}>İptal</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                    <div>
                                        <p className="text-muted-foreground text-xs">Deneyim Yılı</p>
                                        <p className="font-medium">{member.profiles?.experience_years || 0} Yıl</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Şirkete Giriş</p>
                                        <p className="font-medium">{member.profiles?.hire_date ? new Date(member.profiles.hire_date).toLocaleDateString('tr-TR') : '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Kıdem</p>
                                        <p className="font-medium">{member.profiles?.seniority_level || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-xs">Ekibe Katılım</p>
                                        <p className="font-medium">{new Date(member.joined_at).toLocaleDateString('tr-TR')}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
                {team.members.length === 0 && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl bg-muted/10">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium text-foreground">Henüz ekibinizde kimse yok</h3>
                        <p className="text-muted-foreground mb-4">Sağ üstteki "Personel Ekle" butonunu kullanarak ekibinize ilk üyeyi ekleyin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
