export function getEditableFieldsByStatus(status: string) {
  switch (status) {
    case 'PRE_CADASTRO':
      return {
        descricao: true,
        descricaoComercial: true,
        codigoSku: true,
      };
    case 'CADASTRO_COMPLETO':
      return {
        descricao: false,
        descricaoComercial: true,
        codigoSku: false,
      };
    default:
      return {
        descricao: false,
        descricaoComercial: false,
        codigoSku: false,
      };
  }
}
