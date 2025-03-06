import axios from 'axios';
import { Legend, LegendFormData, FilterParams } from '../types';

const API_URL = 'http://localhost:8080/api';

export const fetchLegends = async (filters: FilterParams = {}): Promise<Legend[]> => {
  const response = await axios.get(`${API_URL}/legends`, { params: filters });
  return response.data;
};

export const fetchLegendById = async (id: number): Promise<Legend> => {
  const response = await axios.get(`${API_URL}/legends/${id}`);
  return response.data;
};

export const createLegend = async (legendData: LegendFormData): Promise<Legend> => {
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
  await axios.delete(`${API_URL}/legends/${id}`);
};