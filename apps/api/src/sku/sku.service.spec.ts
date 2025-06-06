// src/sku/sku.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SkuService } from './sku.service';
import { SkuStateService } from './sku-state.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkuStatus } from './sku-status.enum';

describe('SkuService', () => {
  let service: SkuService;
  let prisma: PrismaService;
  let stateService: SkuStateService;

  const mockSku = {
    id: '123',
    status: SkuStatus.ATIVO,
    name: 'SKU Example',
    descricao: 'Descrição do SKU',
    descricaoComercial: 'Descrição Comercial do SKU',
    codigoSku: 'SKU123',
    createdAt: new Date(),
    updatedAt: new Date(),
    availableStatuses: [SkuStatus.ATIVO, SkuStatus.DESATIVADO],
  };

  const prismaMock = {
    sku: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const stateServiceMock = {
    getAllStatuses: jest.fn(),
    getAllowedTransitions: jest.fn(),
    assertTransition: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkuService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: SkuStateService, useValue: stateServiceMock },
      ],
    }).compile();

    service = module.get<SkuService>(SkuService);
    prisma = module.get<PrismaService>(PrismaService);
    stateService = module.get<SkuStateService>(SkuStateService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a SKU', async () => {
      (prisma.sku.create as jest.Mock).mockResolvedValue(mockSku);
      const data = { name: 'New SKU', status: SkuStatus.ATIVO };
      const result = await service.create(data);
      expect(prisma.sku.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(mockSku);
    });
  });

  describe('findAll', () => {
    it('should return all SKUs', async () => {
      (prisma.sku.findMany as jest.Mock).mockResolvedValue([mockSku]);
      const result = await service.findAll();
      expect(prisma.sku.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockSku]);
    });
  });

  describe('findOne', () => {
    it('should return a SKU with allowed statuses by default', async () => {
      (prisma.sku.findUnique as jest.Mock).mockResolvedValue(mockSku);
      (stateService.getAllowedTransitions as jest.Mock).mockReturnValue([SkuStatus.DESATIVADO]);

      const result = await service.findOne('123');

      expect(prisma.sku.findUnique).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(stateService.getAllowedTransitions).toHaveBeenCalledWith(mockSku.status);
      expect(result).toEqual({ ...mockSku, availableStatuses: [SkuStatus.DESATIVADO] });
    });

    it('should return a SKU with all statuses if allStatuses option is true', async () => {
      (prisma.sku.findUnique as jest.Mock).mockResolvedValue(mockSku);
      (stateService.getAllStatuses as jest.Mock).mockReturnValue([
        SkuStatus.PRE_CADASTRO,
        SkuStatus.CADASTRO_COMPLETO,
        SkuStatus.ATIVO,
        SkuStatus.DESATIVADO,
        SkuStatus.CANCELADO,
      ]);

      const result = await service.findOne('123', { allStatuses: true });

      expect(stateService.getAllStatuses).toHaveBeenCalled();
      expect(result.availableStatuses).toEqual([
        SkuStatus.PRE_CADASTRO,
        SkuStatus.CADASTRO_COMPLETO,
        SkuStatus.ATIVO,
        SkuStatus.DESATIVADO,
        SkuStatus.CANCELADO,
      ]);
    });

    it('should throw NotFoundException if SKU not found', async () => {
      (prisma.sku.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a SKU', async () => {
      const updatedSku = { ...mockSku, status: SkuStatus.DESATIVADO };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockSku);
      (stateService.assertTransition as jest.Mock).mockImplementation(() => true);
      (prisma.sku.update as jest.Mock).mockResolvedValue(updatedSku);

      const result = await service.updateStatus('123', SkuStatus.DESATIVADO);

      expect(service.findOne).toHaveBeenCalledWith('123');
      expect(stateService.assertTransition).toHaveBeenCalledWith(mockSku.status, SkuStatus.DESATIVADO);
      expect(prisma.sku.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { status: SkuStatus.DESATIVADO },
      });
      expect(result).toEqual(updatedSku);
    });

    it('should throw NotFoundException if SKU to update not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      await expect(service.updateStatus('invalid-id', SkuStatus.ATIVO)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if invalid transition', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockSku);
      (stateService.assertTransition as jest.Mock).mockImplementation(() => {
        throw new BadRequestException('Transição inválida');
      });

      await expect(service.updateStatus('123', SkuStatus.CANCELADO)).rejects.toThrow(BadRequestException);
    });
  });
});
