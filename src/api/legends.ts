import axios from 'axios';
import { Legend, LegendFormData, FilterParams } from '../types';

// In a real application, this would be an environment variable
const API_URL = 'http://localhost:8080/api';

// Mock implementation for demo purposes
export const fetchLegends = async (filters: FilterParams = {}): Promise<Legend[]> => {
  const response = await axios.get(`${API_URL}/legends`, { params: filters });
  const data = response.data;

  return data.map((legend: Legend) => ({
    ...legend,
    createdAt: legend.createdAt ? new Date(legend.createdAt).toISOString() : ''
  }));
};


export const fetchLegendById = async (id: number): Promise<Legend> => {
  // In a real app, this would be:
  const response = await axios.get(`${API_URL}/legends/${id}`);
  return response.data;
  
};

export const createLegend = async (legendData: LegendFormData): Promise<Legend> => {
  // In a real app with file upload:
  const formData = new FormData();
  Object.entries(legendData).forEach(([key, value]) => {
    if (key === 'image' && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && !(value instanceof File)) {
      formData.append(key, String(value));
    }
  });
  const response = await axios.post(`${API_URL}/legends`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data; 
  
};

export const updateLegend = async (id: number, legendData: LegendFormData): Promise<Legend> => {
  // In a real app with file upload:
  const formData = new FormData();
  Object.entries(legendData).forEach(([key, value]) => {
    if (key === 'image' && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && !(value instanceof File)) {
      formData.append(key, String(value));
    }
  });
  const response = await axios.put(`${API_URL}/legends/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data; 
  
};

export const deleteLegend = async (id: number): Promise<void> => {
  // In a real app, this would be:
  await axios.delete(`${API_URL}/legends/${id}`);
};