import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { AdminSectionHeader } from '../../components/admin/AdminSectionHeader';
import { tailoringContent } from '../../data/tailoringContent';

export const AdminTailoringPage = () => {
  const {
    bohraMenswear,
    bohraWomenswear,
    schoolUniforms,
    mensWear,
    womensWear,
    childrenAndAlterations,
  } = tailoringContent;

  const categories = [
    { title: bohraMenswear.title, count: bohraMenswear.items.length, group: 'Bohra Speciality', isSpecial: true },
    { title: bohraWomenswear.title, count: bohraWomenswear.items.length, group: 'Bohra Speciality', isSpecial: true },
    { title: 'School Uniforms (MSB & ABN)', count: schoolUniforms.institutions.length, group: 'Uniforms', isSpecial: true },
    { title: mensWear.title, count: mensWear.items.length, group: "Men's Formal", isSpecial: false },
    { title: womensWear.title, count: womensWear.items.length, group: "Women's Couture", isSpecial: false },
    { title: childrenAndAlterations.title, count: childrenAndAlterations.items.length, group: 'Youth & Alterations', isSpecial: false },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Standardized Header */}
      <AdminSectionHeader
        title="Tailoring Home Offerings Management"
        subtitle="Configure bespoke cuts, Dawoodi Bohra community patterns, and school uniform categories."
        badgeText="Tailoring Module"
        badgeVariant="maroon"
        demoNoticeText="Below are the 10 catalog categories currently staged in the decoupled data store. In future phases, these records will sync dynamically with Firebase Firestore."
        actions={
          <Button variant="primary" size="sm" icon={Plus} disabled className="opacity-80">
            Add New Offering [Demo]
          </Button>
        }
      />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <Card
            key={idx}
            variant="default"
            className={`border ${cat.isSpecial ? 'border-2 border-gold/40' : 'border-cream-border'} space-y-3`}
          >
            <div className="flex items-center justify-between">
              <Badge variant={cat.isSpecial ? 'gold' : 'chocolate'} size="xs">
                {cat.group}
              </Badge>
              <span className="text-xs font-mono text-chocolate-500">{cat.count} Offerings</span>
            </div>

            <h3 className="font-serif font-bold text-lg text-chocolate-900">{cat.title}</h3>

            <div className="text-xs text-chocolate-600 space-y-1 pt-2 border-t border-cream-border">
              <p className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Data store synchronized
              </p>
              <p className="text-[11px] text-chocolate-500">
                Visible on public catalogue page (/tailoring)
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTailoringPage;
