'use client';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SkuFormData, skuFormSchema } from '@/service/zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSku, updateStatus } from '@/service/sku-api';
import { getEditableFieldsByStatus } from '@/app/utils/sku-helpers';

export default function UpdateSkuPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [skuId, setSkuId] = useState('');
  const [availableStatuses, setAvailableStatuses] = useState<string[]>([]);
  const [editableFields, setEditableFields] = useState({
    descricao: false,
    descricaoComercial: false,
    codigoSku: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkuFormData>({
    resolver: zodResolver(skuFormSchema),
  });

  async function fetchData() {
    try {
      if (!id) throw new Error('ID is undefined');
      if (typeof id !== 'string') throw new Error('Invalid ID');
      const data = await getSku(id);
      const currentStatus = data.status as string;
      const allowedStatuses: string[] = data.availableStatuses ?? [];

      const filteredStatuses = allowedStatuses.filter((s) => s !== currentStatus);
      const orderedStatuses = [currentStatus, ...filteredStatuses];

      const fields = getEditableFieldsByStatus(currentStatus);
      setEditableFields(fields);

      setSkuId(data.id);
      reset(data);
      setAvailableStatuses(orderedStatuses);
    } catch {
      alert('Erro ao carregar SKU');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.id) fetchData();
  }, [params.id, reset]);

  const onSubmit = async (data: SkuFormData) => {
    try {
      await updateStatus(skuId, data.status);
      alert('Status atualizado com sucesso!');
      await fetchData();
    } catch {
      alert('Erro ao atualizar status');
    }
  };

  if (loading) return <p className="p-4">Carregando SKU...</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-green-900 mb-6">Editar SKU</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="codigoSku" className="block text-sm font-medium mb-1">Código SKU</label>
            <input
              id="codigoSku"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
              {...register('codigoSku')}
              disabled={!editableFields.codigoSku}
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-sm font-medium mb-1">Descrição</label>
            <input
              id="descricao"
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register('descricao')}
              disabled={!editableFields.descricao}
            />
          </div>

          <div>
            <label htmlFor="descricaoComercial" className="block text-sm font-medium mb-1">Descrição Comercial</label>
            <input
              id="descricaoComercial"
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register('descricaoComercial')}
              disabled={!editableFields.descricaoComercial}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded px-3 py-2"
              {...register('status')}
            >
              {availableStatuses.map((status, index) => (
                <option key={status} value={status} disabled={index === 0}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              Atualizar status
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
