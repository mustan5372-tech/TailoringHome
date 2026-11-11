import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Info, Plus } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../constants/navigation';
import { fabricContent } from '../../data/fabricContent';

export const AdminFabricPage = () => {
  const { bohraFabrics, schoolUniformFabrics } = fabricContent;

  const textileGroups = [
    { title: bohraFabrics.title, count: bohraFabrics.items.length, group: 'Bohra Speciality', isSpecial: true },
    { title: 'School Uniform Textiles (MSB & ABN)', count: schoolUniformFabrics.institutions.length, group: 'Uniforms', isSpecial: true },
    { title: 'Egyptian & Pure Cottons', count: 2, group: 'Natural Fibers', isSpecial: false },
    { title: 'Pure Banarasi & Raw Silks', count: 2, group: 'Heritage Silks', isSpecial: false },
    { title: 'European & Irish Linens', count: 2, group: 'Organic Flax', isSpecial: false },
    { title: 'Super 120s–160s Suiting Wools', count: 2, group: 'Luxury Suiting', isSpecial: false },
    { title: 'Heritage Brocades & Ornamental', count: 2, group: 'Designer Weaves', isSpecial: false },
    { title: 'Micro-Velvets & Bemberg Linings', count: 2, group: 'Other Varieties', isSpecial: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-sm border border-cream-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={ROUTES.ADMIN.DASHBOARD}
              className="text-xs text-chocolate-500 hover:text-maroon-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span className="text-stone-300">/</span>
            <Badge variant="chocolate" size="xs">
              Fabric Archive Module
            </Badge>
          </div>
          <h1 className="font-serif font-bold text-2xl text-chocolate-900">
            Fabric Home Textile Archive Management
          </h1>
          <p className="text-xs text-chocolate-600 mt-0.5">
            Manage fabric varieties, yarn counts, Rida material swatches, and school uniform cloths.
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={Plus} disabled className="opacity-80">
          Add New Textile [Demo]
        </Button>
      </div>

      {/* Demo Notice */}
      <div className="bg-cream/60 border border-gold/30 rounded-sm p-3.5 text-xs text-chocolate-700 flex items-start gap-2.5">
        <Info className="h-4 w-4 text-gold-dark shrink-0 mt-0.5" />
        <span>
          <strong>Demo Management View:</strong> Below are the 11 curated fabric varieties staged in the decoupled data store. Future Firestore integration will allow live inventory swatch editing.
        </span>
      </div>

      {/* Textile Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {textileGroups.map((group, idx) => (
          <Card
            key={idx}
            variant="default"
            className={`border ${group.isSpecial ? 'border-2 border-gold/40' : 'border-cream-border'} space-y-3 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={group.isSpecial ? 'gold' : 'chocolate'} size="xs">
                  {group.group}
                </Badge>
                <span className="text-xs font-mono text-chocolate-500">{group.count} Weaves</span>
              </div>
              <h3 className="font-serif font-bold text-base text-chocolate-900">{group.title}</h3>
            </div>

            <div className="text-xs text-chocolate-600 space-y-1 pt-2 border-t border-cream-border">
              <p className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Data store synchronized
              </p>
              <p className="text-[11px] text-chocolate-500">
                Visible on public catalogue page (/fabric)
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFabricPage;

