// app/(dashboard)/layout.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar';
import { ActivateSubscription } from '@/components/dashboard/ActivateSubscription';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check for active subscription (active = trial or paid)
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .in('status', ['active'])
    .maybeSingle();

  if (!subscription) {
    // No active subscription — show activation screen
    // Find the user's site to pass to checkout
    const { data: site } = await supabase
      .from('sites')
      .select('id, subdomain, content')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!site) {
      // No site at all — send to wizard
      redirect('/wizard');
    }

    const siteName = (site.content as any)?.naam || site.subdomain;

    return <ActivateSubscription siteId={site.id} siteName={siteName} subdomain={site.subdomain} />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main area with topbar */}
      <div className="pl-[240px]">
        <DashboardTopbar user={user} />
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
