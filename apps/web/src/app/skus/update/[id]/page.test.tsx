import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UpdateSkuPage from './page';
import * as skuApi from '@/service/sku-api';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
  useParams: () => ({
    id: 'abc123',
  }),
}));

describe('UpdateSkuPage', () => {
  beforeEach(() => {
    jest.spyOn(skuApi, 'getSku').mockResolvedValue({
      id: 'abc123',
      codigoSku: '123ABC',
      descricao: 'Descrição de teste',
      descricaoComercial: 'Descrição comercial teste',
      status: 'PRE_CADASTRO', 
      availableStatuses: ['PRE_CADASTRO', 'ATIVO', 'DESATIVADO'],
   });

    jest.spyOn(skuApi, 'updateStatus').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

    it('exibe dados do SKU e permite atualizar status', async () => {
      render(<UpdateSkuPage />);

      const codigoSkuInput = await screen.findByDisplayValue('123ABC');
      expect(codigoSkuInput).toBeInTheDocument();

      const statusSelect = screen.getByLabelText(/Status/i);
      expect(statusSelect).toHaveValue('PRE_CADASTRO');
      expect(screen.getByRole('option', { name: 'PRE_CADASTRO' })).toBeDisabled();
      expect(screen.getByRole('option', { name: 'ATIVO' })).not.toBeDisabled();

      fireEvent.change(statusSelect, { target: { value: 'ATIVO' } });

      fireEvent.click(screen.getByRole('button', { name: /Atualizar status/i }));

      await waitFor(() => {
        expect(skuApi.updateStatus).toHaveBeenCalledWith('abc123', 'ATIVO');
      });
    });
});
