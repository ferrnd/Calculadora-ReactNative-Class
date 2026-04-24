# 📱 Calculadora Mobile - React Native & Expo

Este projeto é um aplicativo de calculadora funcional desenvolvido durante as aulas práticas de desenvolvimento mobile. O projeto foi construído de forma **guiada**, acompanhando a lógica e as explicações do instrutor para consolidar o conhecimento em componentização e estados no **React Native**.

---

## Tecnologias

* **React Native**
* **Expo** (Workflow Managed)
* **JavaScript (ES6+)**

---

## Funcionalidades Praticadas

O desenvolvimento deste app permitiu o estudo de conceitos essenciais:

* **Componentização Reutilizável:** Criação de componentes como o `Botao.js`, que aceita diferentes tipos e tamanhos via props.
* **Lógica Matemática Isolada:** Separação de funções puras em `src/utils/Calculos.js` para facilitar a manutenção e testes.
* **Interface Dinâmica:**
    * Uso de `aspectRatio` para botões perfeitamente circulares.
    * Ajuste dinâmico de fonte no `Display.js` conforme o número de dígitos.
    * Uso de `FlatList` para exibição de histórico de operações.
* **Estilização com Flexbox:** Organização da grade de botões e alinhamento do visor.

---

## Estrutura de Arquivos

A organização do código seguiu a seguinte estrutura:

* `src/components/`: Componentes menores (Botão, Display, Grade de botões, Histórico).
* `src/screens/`: Tela principal que gerencia o estado da calculadora.
* `src/styles/`: Centralização das cores (`colors.js`) para facilitar temas.
* `src/utils/`: Toda a lógica de cálculo e formatação.

---

## 🎨 Cores Utilizadas

A paleta foi definida no arquivo `colors.js`:
* **Fundo:** `#1a1a1a` (Preto)
* **Operadores:** `#f09000` (Laranja)
* **Limpeza:** `#d9534f` (Vermelho)
* **Números:** `#2d2d2d` (Cinza Escuro)

---
