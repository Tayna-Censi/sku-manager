import { api } from './api';
import { SkuFormData } from './zod-schemas';

export async function getSkus() {
  const { data } = await api.get('/skus');
  return data;
}

export async function getSku(id: string) {
  const { data } = await api.get(`/skus/${id}`);
  return data;
}

export async function createSku(input: SkuFormData) {
  const { data } = await api.post('/skus', input);
  return data;
}

export async function updateStatus(id: string, status: string) {
  const { data } = await api.patch(`/skus/${id}/status`, { status });
  return data;
}
