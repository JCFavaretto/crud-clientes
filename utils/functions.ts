export const formatDateFromFirebaseTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
