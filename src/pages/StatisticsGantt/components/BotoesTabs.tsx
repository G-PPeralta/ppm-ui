//  CRIADO EM: 8/2022
//  AUTOR: Eduardo Muchak.
//  DESCRIÇÃO DO ARQUIVO: Renderiza botões em conjunto

import { Button, ButtonGroup } from "@chakra-ui/react";

interface Tab {
  tabSelecionado: any;
  setTabSelecionado: (tab: number) => void;
}

interface Props {
  tab: Tab;
}

function BotoesTabs({ tab }: Props) {
  const { tabSelecionado, setTabSelecionado } = tab;

  const botoes = [
    {
      nome: "Geral",
      selecionado: tabSelecionado === 0,
    },
    {
      nome: "Anotações",
      selecionado: tabSelecionado === 1,
    },
    {
      nome: "MOC",
      selecionado: tabSelecionado === 2,
    },
    {
      nome: "Lições Aprendidas",
      selecionado: tabSelecionado === 3,
    },
    {
      nome: "Ocorrências",
      selecionado: tabSelecionado === 4,
    },
  ];

  const handleClick = (index: number) => {
    setTabSelecionado(index);

    botoes.map((botao, i) => {
      if (i === index) {
        botao.selecionado = true;
      } else {
        botao.selecionado = false;
      }
      return botao;
    });
  };

  return (
    <ButtonGroup size="lg" isAttached variant="outline">
      {botoes.map((botao, index) => (
        <Button
          fontSize={"14px"}
          fontWeight={"bold"}
          color={botao.selecionado ? "#FEFEFE" : "origem.300"}
          backgroundColor={botao.selecionado ? "origem.300" : "#FEFEFE"}
          _hover={{
            background: "origem.500",
            transition: "all 0.4s",
            color: "#FEFEFE",
          }}
          onClick={() => handleClick(index)}
        >
          {botao.nome}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default BotoesTabs;
