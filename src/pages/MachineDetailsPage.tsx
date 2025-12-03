import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { mockMachines, mockDocuments } from '@/data/mockData';
import { ArrowLeft, Calendar, MapPin, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatFullDate } from '@/utils/date';

export default function MachineDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const machine = mockMachines.find((m) => m.id === id);
  const machineDocuments = mockDocuments.filter((d) => d.machineId === id);

  if (!machine) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-medium">Machine not found</h2>
          <Button onClick={() => navigate('/machines')} className="mt-4">
            Back to Machines
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/machines')}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Machines
        </button>

        {/* Machine Header Card */}
        <div className="mb-8 rounded-lg border border-border bg-card p-8">
          <div className="flex gap-8">
            {/* Machine Image */}
            <div className="flex h-64 w-96 items-center justify-center overflow-hidden rounded-lg bg-muted">
              {machine.imageUrl ? (
                <img
                  src={machine.imageUrl}
                  alt={machine.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-8xl font-bold text-muted-foreground/20">AMF</div>
              )}
            </div>

            {/* Machine Details */}
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-medium text-foreground">
                    {machine.name}
                  </h1>
                  <p className="mt-2 text-xl text-muted-foreground">
                    Serial Number: {machine.serialNumber}
                  </p>
                </div>
                {machine.isNew && <Badge variant="new">NEW</Badge>}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Activity className="h-5 w-5" />
                  <span className="text-sm">
                    Status:{' '}
                    <span className="font-medium text-foreground capitalize">
                      {machine.status}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">
                    Installed: {formatFullDate(machine.installationDate)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">{machine.location}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => navigate(`/documentation?machine=${id}`)}
                  size="lg"
                  className="w-full max-w-xs"
                >
                  View Documentation ({machine.documentCount})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Documents */}
        {machineDocuments.length > 0 && (
          <div>
            <h2 className="mb-4 text-xl font-medium">Quick Access Documents</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {machineDocuments.slice(0, 6).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-destructive/10">
                    <span className="text-xs font-semibold text-destructive uppercase">
                      {doc.fileType}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{doc.filename}</p>
                    <p className="text-xs text-muted-foreground">{doc.category}</p>
                  </div>
                  {doc.isNew && <Badge variant="new">NEW</Badge>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
