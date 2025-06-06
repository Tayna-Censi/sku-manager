  'use client';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { skuFormSchema, SkuFormData } from '@/service/zod-schemas';
  import { createSku } from '@/service/sku-api';
  import { useRouter } from 'next/navigation';
  import { useState } from 'react';

  export default function NewSkuPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SkuFormData>({
      resolver: zodResolver(skuFormSchema),
      defaultValues: {
        status: 'PRE_CADASTRO',
      },
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: SkuFormData) => {
      setLoading(true);
      try {
        await createSku(data);
        router.push('/');
      } catch {
        alert('Erro ao criar SKU');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">
          <h1 className="text-2xl font-bold text-green-900 mb-6">Novo SKU</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="codigoSku" className="block text-sm font-medium mb-1">Código SKU</label>
              <input
                id="codigoSku"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                {...register('codigoSku')}
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium mb-1">Descrição</label>
              <input
                id="descricao"
                className="w-full border border-gray-300 rounded px-3 py-2"
                {...register('descricao')}
              />
              {errors.descricao && (
                <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="descricaoComercial" className="block text-sm font-medium mb-1">Descrição Comercial</label>
              <input
                id="descricaoComercial"
                className="w-full border border-gray-300 rounded px-3 py-2"
                {...register('descricaoComercial')}
              />
              {errors.descricaoComercial && (
                <p className="text-red-500 text-sm mt-1">{errors.descricaoComercial.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
              <select
                id="status"
                className="w-full border border-gray-300 rounded px-3 py-2"
                {...register('status')}
              >
                <option value="PRE_CADASTRO">PRE_CADASTRO</option>
                <option value="CADASTRO_COMPLETO">CADASTRO_COMPLETO</option>
                <option value="ATIVO">ATIVO</option>
                <option value="DESATIVADO">DESATIVADO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar SKU'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
