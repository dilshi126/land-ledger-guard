import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { getAllDeeds, getAuditLogs, initializeSampleData } from '@/lib/deedStorage';
import { Deed, AuditLog } from '@/lib/types';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Plus,
  FileSearch
} from 'lucide-react';

const Index = () => {
  const [deeds, setDeeds] = useState<Deed[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await initializeSampleData();
        const allDeeds = await getAllDeeds();
        setDeeds(allDeeds);
        const allLogs = await getAuditLogs();
        setLogs(allLogs);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const activeCount = deeds.filter(d => d.status === 'ACTIVE').length;
  const transferredCount = deeds.filter(d => d.status === 'TRANSFERRED').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Land Registry System
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Secure and transparent land management system.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/deeds">
                <Button variant="outline" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Register Deed
                </Button>
              </Link>
              <Link to="/verify">
                <Button variant="hero" size="lg">
                  <FileSearch className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard
            title="Total Deeds"
            value={deeds.length}
            description="Registered in system"
            icon={Database}
            variant="default"
          />
          <StatsCard
            title="Active Deeds"
            value={activeCount}
            description="Currently active ownerships"
            icon={CheckCircle2}
            variant="success"
          />
          <StatsCard
            title="Transferred"
            value={transferredCount}
            description="Ownership transferred"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="mb-10">
          <RecentActivity logs={logs} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Land Registry System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
