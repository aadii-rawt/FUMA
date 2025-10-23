import React from "react";

// Skeleton shimmer table for "Automations" (10 rows by default)
export function AutomationShimmer({ rows = 10 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white mx-4">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-left text-gray-500 font-medium">
            <th className="px-6 py-3">Automation</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Last Published</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              {/* Automation cell */}
              <td className="px-6 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-md bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-3 w-40 bg-gray-200 rounded" />
                    <div className="mt-2 h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              </td>

              {/* Status pill */}
              <td className="px-6 py-3">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
              </td>

              {/* Date */}
              <td className="px-6 py-3">
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Usage:
<AutomationsTableShimmer rows={10} />
*/
