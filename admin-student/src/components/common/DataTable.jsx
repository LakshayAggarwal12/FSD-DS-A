import React from 'react';
import { colors, radii, typography, transitions } from '../../utils/theme';

export default function DataTable({
  columns = [],
  data = [],
  keyExtractor = (row, index) => row.id || index,
  emptyMessage = 'No records found',
  emptySubtext = 'Try refining your filters or search criteria.',
  style = {}
}) {
  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        backgroundColor: colors.white,
        borderRadius: radii.lg,
        border: `1px solid ${colors.slate200}`,
        boxSizing: 'border-box',
        ...style
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontFamily: typography.fontFamily,
          fontSize: '13px'
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: colors.slate50,
              borderBottom: `1px solid ${colors.slate200}`
            }}
          >
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  padding: '12px 16px',
                  fontWeight: '600',
                  color: colors.slate600,
                  fontSize: '12px',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  width: col.width || 'auto',
                  textAlign: col.align || 'left',
                  whiteSpace: 'nowrap'
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: '48px 16px',
                  textAlign: 'center',
                  color: colors.slate500
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: colors.slate100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.slate400,
                      marginBottom: '4px'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <strong style={{ color: colors.slate700, fontSize: '14px' }}>{emptyMessage}</strong>
                  {emptySubtext && <span style={{ fontSize: '12px', color: colors.slate500 }}>{emptySubtext}</span>}
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowKey = keyExtractor(row, index);
              return (
                <tr
                  key={rowKey}
                  style={{
                    borderBottom: index < data.length - 1 ? `1px solid ${colors.slate100}` : 'none',
                    transition: transitions.fast
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.slate50)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {columns.map((col, cIdx) => (
                    <td
                      key={col.key || cIdx}
                      style={{
                        padding: '12px 16px',
                        color: colors.slate800,
                        textAlign: col.align || 'left',
                        verticalAlign: 'middle',
                        ...col.cellStyle
                      }}
                    >
                      {col.render ? col.render(row, index) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
