import React from 'react';
import { render, screen } from '@testing-library/react';
import * as reactQuery from '@tanstack/react-query';
import '@testing-library/jest-dom';
import Home from './page';


jest.mock('@tanstack/react-query');

describe('Página Home', () => {
  const useQueryMock = reactQuery.useQuery as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve mostrar o loading enquanto carrega', () => {
    useQueryMock.mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(<Home />);
    expect(screen.getByText(/Carregando SKUs.../i)).toBeInTheDocument();
  });

  it('deve renderizar a lista de SKUs quando carregado', () => {
    useQueryMock.mockReturnValue({
      data: [
        {
          id: 1,
          codigoSku: 'SKU001',
          descricao: 'Produto 1',
          status: 'ATIVO',
        },
        {
          id: 2,
          codigoSku: 'SKU002',
          descricao: 'Produto 2',
          status: 'DESATIVADO',
        },
      ],
      isLoading: false,
    });

    render(<Home />);

    expect(screen.getByText('SKU001')).toBeInTheDocument();
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('ATIVO')).toBeInTheDocument();

    expect(screen.getByText('SKU002')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('DESATIVADO')).toBeInTheDocument();

    expect(screen.queryByText(/Carregando SKUs.../i)).not.toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não há SKUs', () => {
    useQueryMock.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Home />);

    expect(screen.getByText(/Nenhum SKU cadastrado ainda/i)).toBeInTheDocument();
  });
});
