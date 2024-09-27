export const maskCpf = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos
  cpf = cpf.replace(/^(\d{3})(\d)/, "$1.$2"); // Adiciona o primeiro ponto após os primeiros 3 dígitos
  cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3"); // Adiciona o segundo ponto após os próximos 3 dígitos
  cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4"); // Adiciona o hífen antes dos últimos 2 dígitos

  return cpf;
};

export const pispasep = (pis: string): string => {
  pis = pis.replace(/\D/g, ""); //Remove tudo o que não é dígito
  pis = pis.replace(/^(\d{3})(\d)/, "$1.$2"); //Coloca ponto entre o terceiro e o quarto dígitos
  pis = pis.replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
  pis = pis.replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3.$4"); //Coloca ponto entre o décimo e o décimo primeiro dígitos
  return pis;
};

export const maskCtps = (ctps: string): string => {
  ctps = ctps.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos ou letras
  ctps = ctps.replace(/^(\d{8})(\d)/, "$1 $2"); // Adiciona um espaço após os primeiros 8 dígitos (número da CTPS)
  ctps = ctps.replace(/^(\d{8}) (\d{4})(\d)/, "$1 $2 $3"); // Adiciona outro espaço após os próximos 4 dígitos (série da CTPS)
  return ctps;
};

export const removeMask = (value: string): string => {
    return value.replace(/\D/g, ""); // Remove tudo que não for dígito
  };