// src/sku/sku.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SkuController } from './sku.controller';
import { SkuService } from './sku.service';
import { SkuStatus } from './sku-status.enum';

describe('SkuController', () => {
  let controller: SkuController;
  let service: SkuService;

  const mockSku = {
    id: '123',
    status: SkuStatus.ATIVO,
    name: 'SKU Example',
  };

  const mockSkuWithStatuses = {
    ...mockSku,
    availableStatuses: [SkuStatus.DESATIVADO, SkuStatus.PRE_CADASTRO],
  };

  const skuServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkuController],
      providers: [{ provide: SkuService, useValue: skuServiceMock }],
    }).compile();

    controller = module.get<SkuController>(SkuController);
    service = module.get<SkuService>(SkuService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call skuService.create and return result', async () => {
      skuServiceMock.create.mockResolvedValue(mockSku);
      const dto = { name: 'New SKU', status: SkuStatus.PRE_CADASTRO };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockSku);
    });
  });

  describe('findAll', () => {
    it('should call skuService.findAll and return result', async () => {
      skuServiceMock.findAll.mockResolvedValue([mockSku]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockSku]);
    });
  });

  describe('findOne', () => {
    it('should call skuService.findOne with just id', async () => {
      skuServiceMock.findOne.mockResolvedValue(mockSku);

      const result = await controller.findOne('123');

      expect(service.findOne).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockSku);
    });
  });

  describe('getSku', () => {
    it('should call skuService.findOne with allStatuses = true', async () => {
      skuServiceMock.findOne.mockResolvedValue(mockSkuWithStatuses);

      const result = await controller.getSku('123', 'true');

      expect(service.findOne).toHaveBeenCalledWith('123', { allStatuses: true });
      expect(result).toEqual(mockSkuWithStatuses);
    });

    it('should call skuService.findOne with allStatuses = false', async () => {
      skuServiceMock.findOne.mockResolvedValue(mockSku);

      const result = await controller.getSku('123', 'false');

      expect(service.findOne).toHaveBeenCalledWith('123', { allStatuses: false });
      expect(result).toEqual(mockSku);
    });

    it('should call skuService.findOne with allStatuses = false if query missing', async () => {
      skuServiceMock.findOne.mockResolvedValue(mockSku);

      const result = await controller.getSku('123');

      expect(service.findOne).toHaveBeenCalledWith('123', { allStatuses: false });
      expect(result).toEqual(mockSku);
    });
  });

  describe('updateStatus', () => {
    it('should call skuService.updateStatus with id and status', async () => {
      skuServiceMock.updateStatus.mockResolvedValue(mockSku);

      const dto = { status: SkuStatus.DESATIVADO };

      const result = await controller.updateStatus('123', dto);

      expect(service.updateStatus).toHaveBeenCalledWith('123', SkuStatus.DESATIVADO);
      expect(result).toEqual(mockSku);
    });
  });
});
