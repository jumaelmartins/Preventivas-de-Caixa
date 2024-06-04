import React from "react";

const generateResumo = (manutencoes) => {
  const totalManutencoes = manutencoes.length;

  const manutencoesPorSupervisor = manutencoes.reduce((acc, manutencao) => {
    const supervisor = manutencao["Supervisor"];
    if (!acc[supervisor]) {
      acc[supervisor] = 0;
    }
    acc[supervisor]++;
    return acc;
  }, {});

  const manutencoesPorData = manutencoes.reduce((acc, manutencao) => {
    const data = manutencao["Data Execução"];
    if (!acc[data]) {
      acc[data] = 0;
    }
    acc[data]++;
    return acc;
  }, {});

  return { totalManutencoes, manutencoesPorSupervisor, manutencoesPorData };
};

export default generateResumo;
