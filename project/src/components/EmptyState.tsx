interface EmptyStateProps {
  title: string;
  hint?: string;
}

export default function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
      <p style={{ fontSize: 18, marginBottom: 8 }}>{title}</p>
      {hint && <p style={{ fontSize: 14 }}>{hint}</p>}
    </div>
  );
}
