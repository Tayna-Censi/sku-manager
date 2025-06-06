import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewSkuPage from './page';
import * as skuApi from '@/service/sku-api';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NewSkuPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it('chama createSku e redireciona após submissão com dados válidos', async () => {
    jest.spyOn(skuApi, 'createSku').mockResolvedValueOnce({});
    window.alert = jest.fn();

    render(<NewSkuPage />);

    await userEvent.type(screen.getByLabelText(/Código SKU/i), 'SKU123');
    await userEvent.type(screen.getByLabelText(/^Descrição$/i), 'Descrição do SKU');
    await userEvent.type(screen.getByLabelText(/Descrição Comercial/i), 'Desc Comercial');
    await userEvent.selectOptions(screen.getByLabelText(/Status/i), 'ATIVO');

    await userEvent.click(screen.getByRole('button', { name: /Criar SKU/i }));

    await waitFor(() => {
      expect(skuApi.createSku).toHaveBeenCalledWith({
        codigoSku: 'SKU123',
        descricao: 'Descrição do SKU',
        descricaoComercial: 'Desc Comercial',
        status: 'ATIVO',
      });
      expect(pushMock).toHaveBeenCalledWith('/');
      expect(window.alert).not.toHaveBeenCalled();
    });
  });

  it('mostra alerta em caso de erro na criação', async () => {
    jest.spyOn(skuApi, 'createSku').mockRejectedValueOnce(new Error('Erro'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<NewSkuPage />);

    await userEvent.type(screen.getByLabelText(/Código SKU/i), 'SKU123');
    await userEvent.type(screen.getByLabelText(/^Descrição$/i), 'Descrição do SKU');
    await userEvent.type(screen.getByLabelText(/Descrição Comercial/i), 'Desc Comercial');
    await userEvent.selectOptions(screen.getByLabelText(/Status/i), 'ATIVO');

    await userEvent.click(screen.getByRole('button', { name: /Criar SKU/i }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Erro ao criar SKU');
    });

    alertSpy.mockRestore();
  });
});
