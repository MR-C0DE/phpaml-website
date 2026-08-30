import type { Metadata } from "next";
import Link from "next/link";
import "../news/admin.css";
export const metadata: Metadata = { title: "News Admin Login", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string; return_to?: string }> }) { const query = await searchParams; return <main className="admin-login-page"><section><small>PHPAML / ADMIN</small><h1>Newsroom</h1><p>Accès réservé à l’équipe éditoriale PHPAML.</p>{query.error && <p className="admin-login-error">Mot de passe incorrect.</p>}<form action="/api/admin/login" method="post"><input type="hidden" name="return_to" value={query.return_to || "/admin/news"} /><label>Mot de passe administrateur<input name="password" type="password" required autoComplete="current-password" /></label><button type="submit">Ouvrir l’éditeur <span>→</span></button></form><Link href="/fr/news">← Retour aux actualités</Link></section></main>; }
