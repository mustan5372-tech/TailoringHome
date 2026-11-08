import React, { useState } from 'react';
import { Trash2, AlertTriangle, CheckCircle, HardDrive, RefreshCw } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { env } from '../../config/env.config';
import { COLLECTIONS } from '../../services/firebase/firestore.service';
import { cleanupTestRecordsInCollection } from '../../services/firebase/cleanup.service';

export const AdminCleanupPage = () => {
  const [selectedCollection, setSelectedCollection] = useState(COLLECTIONS.GALLERY);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error' | 'loading', message: '' }
  const [report, setReport] = useState(null);

  const handleRunCleanup = async () => {
    setStatus({ type: 'loading', message: `Purging test images and records in [${selectedCollection}]...` });
    setReport(null);

    try {
      const res = await cleanupTestRecordsInCollection(selectedCollection);
      setReport(res);
      setStatus({
        type: 'success',
        message: `Cleanup completed. Checked partition [${env.firestorePrefix}], purged ${res.cleanedCount} items.`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: `Cleanup failed: ${err.message || 'Unknown error'}`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* Title */}
      <div className="bg-white p-6 rounded-sm border border-stone-200">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="maroon" size="xs">
            Storage & Database Hygiene
          </Badge>
          <span className="text-xs text-stone-500 font-mono">Atomic Deletion Engine</span>
        </div>
        <h1 className="text-2xl font-serif font-bold text-chocolate-900">
          Test Data & Image Purge Utility
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          Safeguards your Cloud Storage and Firestore from orphan images and test data bloat.
          Guarantees that when a test item is purged, both the database record AND the storage file are deleted together.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-sm flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <p className="font-semibold">Scoped Partition Protection Active</p>
          <p>
            You are operating in <strong>{env.mode}</strong> mode. This utility is restricted to collections prefixed with{' '}
            <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">{env.firestorePrefix}</code> and storage folder{' '}
            <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-bold">{env.storageFolder}/</code>. Production data is completely protected.
          </p>
        </div>
      </div>

      {/* Action Card */}
      <Card variant="default">
        <h3 className="font-serif font-bold text-lg text-chocolate-900 mb-4">
          Select Collection to Clean
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Target Partitioned Collection:
            </label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full max-w-md px-3.5 py-2.5 rounded-sm border border-stone-300 text-sm focus:outline-hidden focus:border-maroon-700 font-mono"
            >
              <option value={COLLECTIONS.GALLERY}>{COLLECTIONS.GALLERY} (Gallery Showcase)</option>
              <option value={COLLECTIONS.TAILORING}>{COLLECTIONS.TAILORING} (Tailoring Services)</option>
              <option value={COLLECTIONS.FABRICS}>{COLLECTIONS.FABRICS} (Fabrics Catalogue)</option>
              <option value={COLLECTIONS.ENQUIRIES}>{COLLECTIONS.ENQUIRIES} (Customer Enquiries)</option>
            </select>
          </div>

          <div className="p-4 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-800">
              <HardDrive className="h-4 w-4 text-maroon-700" />
              <span>How This Dual Cleanup Operates:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-stone-600">
              <li>Queries documents in <code>{selectedCollection}</code> where <code>isTest == true</code>.</li>
              <li>Extracts attached Storage paths / download URLs from the record.</li>
              <li>Calls <code>deleteFile()</code> on Firebase Storage for every attached image.</li>
              <li>Atomically calls <code>deleteDoc()</code> on Firestore to remove the database entry.</li>
            </ol>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              icon={Trash2}
              onClick={handleRunCleanup}
              disabled={status?.type === 'loading'}
              className="bg-red-700 hover:bg-red-800 border-red-800 text-white"
            >
              {status?.type === 'loading' ? 'Purging in progress...' : 'Execute Test Purge'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Diagnostics / Results */}
      {status && (
        <div
          className={`p-4 rounded-sm border ${
            status.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : status.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold">
            {status.type === 'success' && <CheckCircle className="h-4 w-4" />}
            {status.type === 'error' && <AlertTriangle className="h-4 w-4" />}
            {status.type === 'loading' && <RefreshCw className="h-4 w-4 animate-spin" />}
            <span>{status.message}</span>
          </div>

          {report && (
            <div className="mt-3 pt-3 border-t border-emerald-200/80 text-xs space-y-1 font-mono">
              <p>Total Test Records Identified: {report.totalFound}</p>
              <p>Total Records & Storage Images Purged: {report.cleanedCount}</p>
              {report.errors?.length > 0 && (
                <p className="text-red-700">Errors encountered: {report.errors.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCleanupPage;
