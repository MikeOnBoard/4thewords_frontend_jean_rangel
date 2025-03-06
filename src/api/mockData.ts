import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const categories = [
  "Fantasmas",
  "Criaturas míticas",
  "Presagios",
  "Brujas",
  "Apariciones",
  "Maldiciones"
];

export const provinces = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón"
];

export const formatRelativeDate = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { 
      addSuffix: true,
      locale: es 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};