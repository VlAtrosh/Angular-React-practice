function StatCard({ label, value, color = '#f0f0f0', icon }) {
  return (
    <div
      style={{
        background: color,
        padding: '16px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        flex: 1, // растягивается, если внутри flex-контейнера
      }}>
      {/* value вставляем через {} */}
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#555', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default StatCard;
