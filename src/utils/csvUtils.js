// CSV export utility
export const exportToCSV = (data, filename) => {
  const headers = ['day', 'subject_id', 'subject_title', 'planned_min', 'remaining_sec', 'completed', 'timestamp'];
  
  const rows = [headers];
  
  Object.keys(data.days).forEach(day => {
    data.days[day].forEach(subject => {
      rows.push([
        day,
        subject.id,
        subject.title,
        Math.round(subject.totalSeconds / 60),
        subject.remainingSeconds,
        subject.completed ? 'yes' : 'no',
        new Date().toISOString()
      ]);
    });
  });
  
  const csvContent = rows
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `placement_progress_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
