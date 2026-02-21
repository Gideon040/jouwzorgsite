// app/(dashboard)/layout.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar';

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
    // No active subscription — redirect to wizard to start/complete checkout
    redirect('/wizard');
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
