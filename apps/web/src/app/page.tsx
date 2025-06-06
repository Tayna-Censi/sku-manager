'use client';

import { useQuery } from '@tanstack/react-query';
import { getSkus } from '../service/sku-api';
import { Sku } from '@prisma/client';
import Link from 'next/link';

export default function Home() {
  const { data: skus = [], isLoading } = useQuery({
    queryKey: ['skus'],
    queryFn: getSkus,
  });

  if (isLoading)
    return (
      <div className="p-6 text-gray-600 animate-pulse">Carregando SKUs...</div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">SKUs Cadastrados</h1>
        <Link
          href="/skus/create"
          className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          + Criar novo SKU
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-4 font-medium">Código</th>
              <th className="px-6 py-4 font-medium">Descrição</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {skus.map((sku: Sku) => (
              <tr key={sku.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">{sku.codigoSku}</td>
                <td className="px-6 py-4">{sku.descricao}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {sku.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    href={`/skus/update/${sku.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {skus.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Nenhum SKU cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
