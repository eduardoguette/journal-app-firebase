export const mymoment = (date_note) => {
  const date = new Intl.DateTimeFormat('es', { dateStyle: 'long' });
  
  if(typeof date_note === "number")
  return date.format(new Date(date_note));
};
