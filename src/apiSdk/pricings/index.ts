import axios from 'axios';
import queryString from 'query-string';
import { PricingInterface, PricingGetQueryInterface } from 'interfaces/pricing';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPricings = async (query?: PricingGetQueryInterface): Promise<PaginatedInterface<PricingInterface>> => {
  const response = await axios.get('/api/pricings', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPricing = async (pricing: PricingInterface) => {
  const response = await axios.post('/api/pricings', pricing);
  return response.data;
};

export const updatePricingById = async (id: string, pricing: PricingInterface) => {
  const response = await axios.put(`/api/pricings/${id}`, pricing);
  return response.data;
};

export const getPricingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pricings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePricingById = async (id: string) => {
  const response = await axios.delete(`/api/pricings/${id}`);
  return response.data;
};
