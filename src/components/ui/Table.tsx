import React from 'react';
import { cn } from '../../lib/utils';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  headers: string[];
  data: any[][];
  className?: string;
}

export const Table = ({ className, headers, data, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-outline">
      <table className={cn('w-full text-left border-collapse', className)} {...props}>
        <thead className="bg-surface-container border-b border-outline">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-surface">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-outline last:border-0 hover:bg-surface-container/50 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4 text-sm text-on-surface">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
