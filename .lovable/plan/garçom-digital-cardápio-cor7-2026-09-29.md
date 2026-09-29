# Garçom Digital — Cardápio Cor7

Cardápio digital mobile-first do restaurante Cor7, com montagem de pedido e envio por WhatsApp. Sem login, sem banco de dados, sem serviços externos. O carrinho existe apenas na memória do navegador.

## O que o cliente verá

1. **Topo fixo** com o nome "Cor7" e um campo de busca por nome do item.
2. **Barra de categorias** logo abaixo, com rolagem lateral e fixa na tela. Ao tocar, a página rola até a seção; a categoria visível fica em vermelho.
3. **Cards de itens** apenas com texto: nome, descrição curta, preço e um botão vermelho "Adicionar" que vira o controle de quantidade (+ / −) depois do primeiro toque.
4. **Itens com escolha** (ex.: Coca Cola Normal/Zero, sabores de caipirinha) abrem um seletor de uma opção antes de adicionar.
5. **Selos discretos** em itens com aviso (ex.: "Sábados, 11hàs 15h"), sem impedir a compra.
6. **Aviso de taxa de rolha (R$ 20,00)** em destaque no topo da categoria Vinhos.
7. **Barra inferior fixa** quando há itens: "Ver pedido (N itens) · R$ total".
8. **Rodapé**: "Venda de bebidas alcoólicas proibida para menores de 18 anos."

## Fluxo do pedido

1. **Conferência**: lista dos itens com quantidade, opção escolhida e subtotal, com +/− e remover; campos opcionais de observação geral, Nome e Mesa (nada é salvo); total; botões "Confirmar pedido" (vermelho) e "Voltar ao cardápio".
2. **Prévia**: mostra o texto exato da mensagem e o botão vermelho "Pedir pelo WhatsApp".
3. **Envio**: abre `https://wa.me/5541996182549?text=...` com a mensagem no formato pedido.

Formato da mensagem:

```text
Olá! Gostaria de fazer um pedido:

2x Frango Frito - R$ 39,80
1x Coca Cola 310ml - R$ 6,90

Observações: ...
Nome: ... | Mesa: ...

Total: R$ 46,70
```

Todos os preços em pt-BR (R$ 19,90).

## Visual

- Apenas branco (#FFFFFF), preto (#111111) e vermelho (#D71920).
- Títulos em Playfair Display, textos em Poppins.
- Base 375px, botões com no mínimo 44px de altura, bastante espaço em branco, sem fotos.

## Conteúdo

Todas as categorias e itens enviados serão cadastrados exatamente como descritos, na ordem: Pratos Executivos (+ Extras), Pratos Especiais, Cardápio de Inverno, Porções, Pastéis, Sanduíches, Hambúrgueres, Bebidas, Sucos, Chopp, Cervejas, Baldes, Drinks sem Álcool, Drinks, Doses, Sobremesas, Cafés e Vinhos. Nenhum item, preço ou descrição será inventado.

## Detalhes técnicos

- `src/config.ts`: nome do restaurante, número do WhatsApp, cores, rodapé.
- `src/data/menu.ts`: tipos `MenuItem` (id, name, price, description?, note?, options?) e `MenuCategory` (id, name, note?, items), com todo o conteúdo tipado. Nenhum preço ou texto de produto em componentes.
- `src/lib/format.ts`: formatação de preço em pt-BR.
- `src/lib/order.ts`: construção do texto da mensagem e da URL do WhatsApp.
- `src/hooks/useCart.ts`: estado do carrinho em memória (add, increment, decrement, remove, totais), chaveado por item + opção.
- Componentes pequenos em `src/components/`: `Header`, `SearchField`, `CategoryBar`, `MenuSection`, `MenuItemCard`, `QuantityStepper`, `OptionSheet`, `CartBar`, `Footer`.
- Rotas: `/` (cardápio, substituindo o placeholder) e `/pedido` (conferência + prévia + envio). Cada rota com seu próprio `head()` de título e descrição.
- Fontes carregadas via `<link>` no `__root.tsx`; cores e famílias registradas como tokens em `src/styles.css` (nada de cor fixa nos componentes).
- Categoria ativa detectada por `IntersectionObserver` durante a rolagem.
- Sem bibliotecas novas além do que já vem no projeto.