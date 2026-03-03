import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsLoading(false);
    if (error) {
      toast({ title: "Giriş başarısız", description: error.message, variant: "destructive" });
    } else {
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupName);
    setIsLoading(false);
    if (error) {
      toast({ title: "Kayıt başarısız", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Kayıt başarılı", description: "E-posta adresinizi doğrulayın." });
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Left Side — Hero Visual */}
      <div className="relative hidden w-1/2 lg:flex lg:items-center lg:justify-center">
        {/* Background Image */}
        <img
          src="/auth-hero.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-accent/30" />

        {/* Branding Content */}
        <div className="relative z-10 flex flex-col items-start gap-6 p-16 text-white">
          {/* Infina Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-xl border border-white/30">
              <img src="/infina-logo.png" alt="İnfina" className="h-10 w-10 object-contain" />
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
              İnfina Core
            </h1>
            <p className="mt-2 text-lg font-medium text-white/80 tracking-wide">
              Kariyer ve Gelişim Platformu
            </p>
          </div>

          <div className="mt-8 space-y-4 max-w-sm">
            <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/20">
              <Sparkles className="h-5 w-5 text-accent shrink-0" />
              <p className="text-sm text-white/90">Kişiselleştirilmiş kariyer yolları ile hedeflerine ulaş</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/20">
              <ArrowRight className="h-5 w-5 text-accent shrink-0" />
              <p className="text-sm text-white/90">Eğitimler, sınavlar ve projelerle her gün bir adım öne geç</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — Login Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        {/* Mobile Logo (visible only on small screens) */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center lg:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-glow">
            <img src="/infina-logo.png" alt="İnfina" className="h-9 w-9 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">İnfina Core</h1>
            <p className="text-sm text-muted-foreground">Kariyer ve Gelişim Platformu</p>
          </div>
        </div>

        <Card variant="glass" className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="mb-6 hidden lg:block">
              <h2 className="text-2xl font-bold text-foreground">Hoş Geldiniz</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hesabınıza giriş yapın veya yeni bir hesap oluşturun</p>
            </div>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                <TabsTrigger value="signup">Kayıt Ol</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-posta</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="ornek@infina.com.tr"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Şifre</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="gradient" size="lg" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={isLoading}>
                    {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Ad Soyad</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        placeholder="Ahmet Yılmaz"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-posta</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="ornek@infina.com.tr"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pl-10 h-11"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Şifre</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="En az 6 karakter"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="pl-10 h-11"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="gradient" size="lg" className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={isLoading}>
                    {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Giriş yaparak <span className="text-primary font-medium">Kullanım Koşulları</span> ve{" "}
              <span className="text-primary font-medium">Gizlilik Politikası</span>'nı kabul etmiş olursunuz.
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-xs text-muted-foreground">
          © 2026 İnfina · Innovation for Finance
        </p>
      </div>
    </div>
  );
}
