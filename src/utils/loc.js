const loc = (field, lang) => {
  if (field && typeof field === 'object') return field[lang] ?? field.en ?? '';
  return field ?? '';
};

export default loc;
