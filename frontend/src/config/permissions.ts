export type AppRole = 'stajyer' | 'personel' | 'takim_lideri' | 'yonetici' | 'ust_yonetici' | 'ik';

// Each route maps to the MINIMUM role required to access it.
// The role hierarchy is: stajyer < personel < takim_lideri < yonetici < ust_yonetici
// 'ik' has broad access (treated as at least yonetici level)
export const screenPermissions: Record<string, AppRole> = {
    '/': 'stajyer',
    '/catalog': 'stajyer',
    '/progress': 'stajyer',
    '/skill-tree': 'stajyer',
    '/career-map': 'personel',
    '/english': 'stajyer',
    '/leadership': 'personel',
    '/soft-skills': 'stajyer',
    '/intern': 'stajyer',
    '/corporate': 'personel',
    '/onboarding': 'stajyer',
    '/community': 'stajyer',
    '/competitions': 'stajyer',
    '/teammates': 'personel',
    '/organization': 'takim_lideri',
    '/films': 'stajyer',
    '/news': 'stajyer',
    '/articles': 'stajyer',
    '/hr-analytics': 'yonetici',
    '/career-path-editor': 'yonetici',
    '/settings': 'stajyer',
    '/admin/users': 'ust_yonetici',
};
