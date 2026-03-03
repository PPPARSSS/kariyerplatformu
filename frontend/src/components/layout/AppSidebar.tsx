import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Akademi", icon: BookOpen, href: "/catalog" },
  { title: "Kariyer Merkezi", icon: TrendingUp, href: "/progress" },
  { title: "Kariyer Haritası", icon: Award, href: "/career-map" },
  { title: "Yetkinlik Ağacım", icon: Target, href: "/skill-tree" },
  { title: "Organizasyon", icon: Building2, href: "/organization" },
  { title: "İngilizce Geliştirme", icon: Globe, href: "/english" },
];

const developmentNavItems: NavItem[] = [
  { title: "Liderlik Gelişimi", icon: Award, href: "/leadership" },
  { title: "Soft Skills", icon: UserCheck, href: "/soft-skills" },
  { title: "Stajyer Portalı", icon: FolderOpen, href: "/intern" },
  { title: "Kurum Eğitimleri", icon: Briefcase, href: "/corporate" },
  { title: "Onboarding", icon: Rocket, href: "/onboarding" },
];

const socialNavItems: NavItem[] = [
  { title: "Topluluk & Forum", icon: MessageSquare, href: "/community" },
  { title: "Yarışmalar", icon: Trophy, href: "/competitions" },
  { title: "Takım Arkadaşları", icon: Users, href: "/teammates" },
];

const mediaNavItems: NavItem[] = [
  { title: "Film Önerileri", icon: Film, href: "/films" },
  { title: "Haberler", icon: Newspaper, href: "/news" },
  { title: "Makaleler", icon: FileText, href: "/articles" },
];

const managementNavItems: NavItem[] = [
  { title: "İK & Analitik", icon: BarChart3, href: "/hr-analytics" },
  { title: "Kariyer Yolu Editörü", icon: Target, href: "/career-path-editor" },
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

  // Filter management items based on role
  const visibleManagementItems = managementNavItems.filter(() => 
    isAtLeast('yonetici') || hasRole('ik')
  );

  const NavSection = ({ items, title }: { items: NavItem[]; title?: string }) => (
    <div className="space-y-1">
      {title && !collapsed && (
        <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
          {title}
        </p>
      )}
      {items.map((item) => (
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">İnfina Gelişim</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
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
          {visibleManagementItems.length > 0 && (
            <NavSection items={visibleManagementItems} title="Yönetim" />
          )}
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
