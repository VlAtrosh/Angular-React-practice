function Badge({ text, color = '#4338ca', bg = '#eef2ff' }) {
  retutn(
    <span
      style={{
        background: bg,
        color: color,
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bolid',
        whiteSpace: 'nowrap',
      }}>
      {text}
    </span>,
  );
}

export default Badge;
