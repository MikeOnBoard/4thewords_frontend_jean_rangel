import { Legend } from '../types';

// Helper function to generate random past dates
const getRandomPastDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return pastDate;  // Devuelve un objeto Date en lugar de una cadena ISO
};


// Mock data for Costa Rican legends
export const mockLegends: Legend[] = [
  {
    id: 1,
    title: "La Llorona",
    description: "Cuenta la leyenda que una mujer que perdió a sus hijos ahogados en un río, vaga por las noches llorando y buscándolos. Su lamento puede escucharse cerca de los ríos y es señal de mal augurio.",
    category: "Fantasmas",
    province: "San José",
    canton: "San José",
    district: "Carmen",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    createdAt: getRandomPastDate().toISOString()
  },
  {
    id: 2,
    title: "El Cadejos",
    description: "Un perro negro de ojos rojos y brillantes que aparece en la noche para proteger a los borrachos y personas que caminan solas por la calle. Se dice que es un guardián que evita que las personas caigan en peligros.",
    category: "Criaturas míticas",
    province: "Alajuela",
    canton: "Alajuela",
    district: "Alajuela",
    imageUrl: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    createdAt: getRandomPastDate().toISOString()
  }
];

// Categories for filtering
export const categories = [
  "Fantasmas",
  "Criaturas míticas",
  "Presagios",
  "Brujas",
  "Apariciones",
  "Maldiciones"
];


// Provinces for filtering
export const provinces = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón"
];

// Helper function to format date in relative format (e.g., "hace 2 días")
export const formatRelativeDate = (dateString: string): string => {
  if (!dateString) return 'Fecha desconocida';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error(`Invalid date value received: "${dateString}"`);
    return 'Fecha inválida';
  }

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};
