import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { screenPermissions, type AppRole } from "@/config/permissions";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  TrendingUp,
  FileText,
  GraduationCap,
  Briefcase,
  Film,
  Newspaper,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Award,
  Target,
  FolderOpen,
  Globe,
  MessageSquare,
  Trophy,
  BarChart3,
  UserCheck,
  Rocket,
  Building2,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  requiredRole?: AppRole;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/", requiredRole: "stajyer" },
  { title: "Akademi", icon: BookOpen, href: "/catalog", requiredRole: "stajyer" },
  { title: "Kariyer Merkezi", icon: TrendingUp, href: "/progress", requiredRole: "stajyer" },
  { title: "Kariyer Haritası", icon: Award, href: "/career-map", requiredRole: "personel" },
  { title: "Yetkinlik Ağacım", icon: Target, href: "/skill-tree", requiredRole: "stajyer" },
  { title: "Organizasyon", icon: Building2, href: "/organization", requiredRole: "takim_lideri" },
  { title: "İngilizce Geliştirme", icon: Globe, href: "/english", requiredRole: "stajyer" },
];

const developmentNavItems: NavItem[] = [
  { title: "Liderlik Gelişimi", icon: Award, href: "/leadership", requiredRole: "personel" },
  { title: "Soft Skills", icon: UserCheck, href: "/soft-skills", requiredRole: "stajyer" },
  { title: "Stajyer Portalı", icon: FolderOpen, href: "/intern", requiredRole: "stajyer" },
  { title: "Kurum Eğitimleri", icon: Briefcase, href: "/corporate", requiredRole: "personel" },
  { title: "Onboarding", icon: Rocket, href: "/onboarding", requiredRole: "stajyer" },
];

const socialNavItems: NavItem[] = [
  { title: "Topluluk & Forum", icon: MessageSquare, href: "/community", requiredRole: "stajyer" },
  { title: "Yarışmalar", icon: Trophy, href: "/competitions", requiredRole: "stajyer" },
  { title: "Takım Arkadaşları", icon: Users, href: "/teammates", requiredRole: "personel" },
];

const mediaNavItems: NavItem[] = [
  { title: "Film Önerileri", icon: Film, href: "/films", requiredRole: "stajyer" },
  { title: "Haberler", icon: Newspaper, href: "/news", requiredRole: "stajyer" },
  { title: "Makaleler", icon: FileText, href: "/articles", requiredRole: "stajyer" },
];

const managementNavItems: NavItem[] = [
  { title: "Ekibim", icon: Users, href: "/manage-team", requiredRole: "takim_lideri" },
  { title: "İK & Analitik", icon: BarChart3, href: "/hr-analytics", requiredRole: "yonetici" },
  { title: "Kariyer Yolu Editörü", icon: Target, href: "/career-path-editor", requiredRole: "yonetici" },
  { title: "Kullanıcı Yönetimi", icon: Shield, href: "/admin/users", requiredRole: "ust_yonetici" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, hasRole, isAtLeast } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  // Filter nav items based on user role
  const filterByRole = (items: NavItem[]) =>
    items.filter((item) => !item.requiredRole || isAtLeast(item.requiredRole));

  const NavSection = ({ items, title }: { items: NavItem[]; title?: string }) => {
    const filtered = filterByRole(items);
    if (filtered.length === 0) return null;
    return (
      <div className="space-y-1">
        {title && !collapsed && (
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            {title}
          </p>
        )}
        {filtered.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
            {!collapsed && <span>{item.title}</span>}
            {!collapsed && item.badge && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-warning px-1.5 text-xs font-semibold text-warning-foreground">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary overflow-hidden">
              <img src="/infina-logo.png" alt="İnfina" className="h-6 w-6 object-contain" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">İnfina Core</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary overflow-hidden">
            <img src="/infina-logo.png" alt="İnfina" className="h-6 w-6 object-contain" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "absolute -right-3 top-6 rounded-full border border-sidebar-border bg-sidebar shadow-md"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <div className="space-y-6">
          <NavSection items={mainNavItems} title="Ana Menü" />
          <NavSection items={developmentNavItems} title="Gelişim" />
          <NavSection items={socialNavItems} title="Topluluk" />
          <NavSection items={mediaNavItems} title="Medya" />
          <NavSection items={managementNavItems} title="Yönetim" />
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <NavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            location.pathname === "/settings" && "bg-sidebar-accent"
          )}
        >
          <Settings className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
          {!collapsed && <span>Ayarlar</span>}
        </NavLink>
        <button
          onClick={handleSignOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
          {!collapsed && <span>Çıkış</span>}
        </button>
      </div>
    </aside>
  );
}
