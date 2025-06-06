import { z } from 'zod';

export const skuFormSchema = z.object({
  descricao: z.string().min(2),
  descricaoComercial: z.string().min(2),
  codigoSku: z.string().min(2),
  status: z.enum([
    'PRE_CADASTRO',
    'CADASTRO_COMPLETO',
    'ATIVO',
    'DESATIVADO',
    'CANCELADO',
  ]),
});

export type SkuFormData = z.infer<typeof skuFormSchema>;
