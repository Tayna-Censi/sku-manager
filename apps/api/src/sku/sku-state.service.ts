import { BadRequestException, Injectable } from "@nestjs/common";
import { SkuStatus } from "./sku-status.enum";

@Injectable()
export class SkuStateService {
  private readonly transitions: Record<SkuStatus, SkuStatus[]> = {
    PRE_CADASTRO: [SkuStatus.CADASTRO_COMPLETO, SkuStatus.CANCELADO],
    CADASTRO_COMPLETO: [SkuStatus.PRE_CADASTRO, SkuStatus.ATIVO, SkuStatus.CANCELADO],
    ATIVO: [SkuStatus.DESATIVADO],
    DESATIVADO: [SkuStatus.ATIVO, SkuStatus.PRE_CADASTRO],
    CANCELADO: [],
  };

  canTransition(from: SkuStatus, to: SkuStatus): boolean {
    return this.transitions[from]?.includes(to);
  }

  assertTransition(from: SkuStatus, to: SkuStatus) {
    if (!this.canTransition(from, to)) {
      throw new BadRequestException(`Transição inválida: ${from} → ${to}`);
    }
  }

  getAllStatuses(): SkuStatus[] {
    return Object.values(SkuStatus);
  }

  getAllowedTransitions(from: SkuStatus): SkuStatus[] {
    return this.transitions[from] || [];
  }
}
