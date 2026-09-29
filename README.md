# Cor7 Digital Menu

Crie o app "Garçom Digital" (restaurante Cor7): um cardápio digital 100% mobile-first, que monta o pedido e o envia por WhatsApp. Sem backend.



## GOVERNANÇA (regras rígidas, valem para toda a vida do projeto)

- Sem login, cadastro, Supabase, banco de dados, analytics ou chamadas a APIs externas.

- Faça SOMENTE o que este prompt pede. Não adicione telas, funções ou bibliotecas extras.

- TypeScript estrito, componentes pequenos e com uma responsabilidade cada.

- TODOS os dados do cardápio ficam em um único arquivo: src/data/menu.ts (tipado). Nenhum preço ou texto de produto pode ficar dentro de componentes.

- Configurações do restaurante em src/config.ts (nome, número do WhatsApp, cores). Nada hardcoded fora dele.

- Não invente produtos, preços, descrições ou imagens. Use apenas os dados abaixo.

- Não colete nem armazene dados pessoais. O carrinho vive só em memória.

- Ao editar, altere apenas os arquivos necessários e nunca reescreva o que já funciona.



## DESIGN

- Paleta estrita: branco (#FFFFFF), preto (#111111) e vermelho (#D71920). Sem outras cores de destaque.

- Títulos em serifada elegante (Playfair Display), texto em Poppins.

- Mobile-first (base 375px), botões com no mínimo 44px, texto legível, muito espaço em branco.

- Sem fotos nesta versão: cards limpos só com texto.



## NAVEGAÇÃO

- Topo fixo: nome "Cor7" + campo de busca por nome do item.

- Abaixo do topo: barra horizontal de categorias com rolagem lateral, sticky. Tocar rola até a seção; a categoria ativa fica em vermelho conforme a rolagem.

- Cada item é um card: nome, descrição curta, preço e controle "+ / − " de quantidade (começa em botão "Adicionar" vermelho; após adicionar vira o seletor).

- Itens com opções (marcados com options) abrem um seletor simples de uma escolha antes de adicionar.

- Itens com note (ex.: "Sábados 11h–15h") mostram um selo discreto. Não bloqueie a compra.

- Barra fixa inferior aparece quando há itens: "Ver pedido (N itens) · R$ total".



## FLUXO DO PEDIDO (sem cadastro)

1. Tela de Conferência: lista dos itens com quantidade, opção, subtotal e botões +/−/remover; campo opcional de observação geral (ex.: "sem cebola"); campo opcional "Nome" e "Mesa" (texto livre, não salvo); total. Botão "Confirmar pedido" (vermelho) e "Voltar ao cardápio".

2. Ao confirmar, mostre a prévia do texto gerado e o botão vermelho "Pedir pelo WhatsApp".

3. Ao clicar, abra: https://wa.me/5541996182549?text=<mensagem com encodeURIComponent>

4. Formato da mensagem:

   Olá! Gostaria de fazer um pedido:

   

   2x Frango Frito - R$ 39,80

   1x Coca Cola 310ml - R$ 6,90

   (obs do item, se houver)

   

   Observações: ...

   Nome: ... | Mesa: ...

   

   Total: R$ 46,70

5. Formate preços em pt-BR (R$ 19,90). Rodapé: "Venda de bebidas alcoólicas proibida para menores de 18 anos."



## DADOS (src/data/menu.ts). Formato: nome | preço | descrição

Categorias na ordem:



PRATOS EXECUTIVOS

Prato Infantil | 14,90 | Nuggets de frango, batata frita, arroz branco e feijão preto

Frango Frito | 19,90 | Arroz branco, feijão preto, farofa da casa e salada mista

Strogonoff de Frango | 19,90 | Arroz branco, farofa da casa, batata palha e salada mista

Carne de Panela | 19,90 | Arroz branco, feijão preto, farofa da casa e salada mista

Porco no Tacho | 19,90 | Arroz branco, feijão preto, farofa da casa e salada mista

Massa ao Molho Sugo | 19,90 | Molho de tomate artesanal e queijo parmesão

Feijoada Cor7 | 31,90 | Feijoada especial, arroz, couve, laranja, torresmo, farofa, vinagrete e banana na chapa | note: "Sábados, 11h às 15h"

EXTRAS DOS EXECUTIVOS

Ovo Frito 1,50 | Salada Mista 2,90 | Batata Frita 6,90 | Carne do Executivo 9,90 | Linguiça Toscana 14,90 | Filé de Frango na Chapa 15,90 | Filé de Tilápia na Chapa 18,90 | Contrafilé na Chapa 18,90



PRATOS ESPECIAIS

Salada Cor7 | 22,00 | Alface, cebola, tomate, rúcula, maçã, azeitonas, ovos de codorna, pepino agridoce, croutons e salsinha

Massa à Bolonhesa | 22,90 | Molho de tomate artesanal e carne moída

Linguiça Toscana | 23,90 | Linguiça assada, arroz, feijão preto, farofa e salada mista

Frango à Parmegiana | 23,90 | Frango empanado, molho de tomate, queijo, arroz, feijão preto, farofa e salada mista

Carne de Onça | 27,90 | Broa integral, carne moída, cebola, cebolinha, pimenta biquinho, temperos e mostarda escura | note: "Quinta a sábado"

Legumes Salteados com Frango | 28,90 | Legumes na manteiga com filé de frango acebolado

Legumes Salteados com Tilápia | 28,90 | Legumes na manteiga com filé de tilápia

Legumes Salteados com Contrafilé | 28,90 | Legumes na manteiga com contrafilé acebolado

Filé de Frango na Chapa | 34,90 | Frango acebolado, batata frita, arroz, feijão preto, farofa e salada mista

Massa à La Carbonara da Casa | 39,00 | Molho branco, bacon e parmesão

Contrafilé na Chapa | 39,90 | Acebolado, batata frita, arroz, feijão preto, farofa e salada mista

Filé de Tilápia na Chapa | 39,90 | Arroz, feijão preto, farofa e salada mista

Massa ao Molho Sugo com Contrafilé | 42,00 | Molho de tomate artesanal, contrafilé e parmesão

Massa ao Molho Branco com Camarão | 56,00 | Molho branco, camarão e parmesão



CARDÁPIO DE INVERNO

Caldinho de Feijão (caneca) | 12,90 | Feijão preto, calabresa, bacon e torradas

Quentão | 12,00

Creme de Mandioca | 22,00 | Mandioca, batata, calabresa, bacon, cheiro verde e torradas

Polenta com Ragu | 22,00 | options: Carne, Frango

Caldo Verde | 22,00 | Mandioca, batata, couve manteiga, calabresa, bacon, cheiro verde e torradas

Sopa de Feijão | 22,00 | Macarrão, feijão preto, calabresa, bacon, cheiro verde e torradas

Sopa de Legumes | 22,00 | Macarrão, abobrinha, cenoura, repolho, couve, batata, batata salsa, cheiro verde e torradas

Sopa de Carne com Legumes | 22,00 | Macarrão, carne, abobrinha, cenoura, repolho, couve, batata, batata salsa, cheiro verde e torradas



PORÇÕES

Bolinho de Bacalhau (6 un) 19,90 | Bolinho de Mandioca com Carne Seca (5 un) 19,90 | Polenta Frita 400g 23,90 | Batata Frita 400g 27,90 | Mini Coxinha de Frango (10 un) 27,90 | Medalhão de Mandioca com Bacon 300g 28,90 | Mandioca 400g 28,90 | Calabresa na Chapa 400g 29,90 | Anéis de Cebola 300g 29,90 | Frango a Passarinho 600g 39,90 | Coração de Frango 400g 39,90 | Torresmo 300g 41,90 | Contrafilé em Tiras com Batatas 600g 65,90 | Iscas de Tilápia 400g 72,90 | Picanha em Tiras com Batatas 600g 77,90

2 Amores | 92,90 | Iscas de tilápia, batata frita e maionese Cor7

Cor7 | 97,90 | Batata frita, anéis de cebola, contrafilé acebolado, frango a passarinho e maionese Cor7

Família | 109,90 | Batata frita, polenta frita, calabresa acebolada, frango a passarinho e maionese Cor7

Adicional de Queijo 4,90 | Adicional de Bacon 6,90



PASTÉIS

Carne 10,90 | Queijo 10,90 | Carne com Queijo 12,90 | Costela com Queijo 16,90 | Brigadeiro 12,90



SANDUÍCHES (todos com pão francês, maionese Cor7 e salsinha)

Pão com Linguiça | 18,90 | Linguiça toscana assada, queijo e vinagrete

Pão com Frango | 19,90 | Filé de frango e queijo

Pão com Porco no Tacho | 22,90 | Porco no tacho, queijo e batata palha

Pão com Bolinho de Carne | 25,90 | Bolinho de carne artesanal, queijo e vinagrete

Pão com Coração de Frango | 25,90 | Coração de frango, cebola na chapa e queijo

Pão com Contrafilé em Tiras | 28,90 | Contrafilé acebolado, queijo e vinagrete

Pão com Costela | 28,90 | Costela assada desfiada, queijo e pepino agridoce



HAMBÚRGUERES (todos com batatas fritas)

Hambúrguer de Frango | 30,90 | Filé de frango acebolado, queijo, maionese Cor7, alface, pepino agridoce e salsinha

Hambúrguer de Carne | 35,90 | Hambúrguer artesanal, queijo, maionese Cor7, rúcula, pepino agridoce e cebola na chapa

Hambúrguer Cor7 | 39,90 | Contrafilé em tiras acebolado, queijo, maionese Cor7, bacon, alface, rúcula e pepino agridoce

Hambúrguer de Costela | 39,90 | Costela desfiada, anéis de cebola, queijo, maionese Cor7, alface, rúcula e pepino agridoce



BEBIDAS

Água 500ml 4,00 (options: Sem gás, Com gás) | Coca Cola 310ml 6,90 (options: Normal, Zero) | Guaraná 350ml 6,90 (options: Normal, Zero) | Tônica 350ml 6,90 (options: Normal, Zero) | Coca Cola 600ml 10,90 (options: Normal, Zero) | Guaraná 600ml 10,90 | Isotônico Powerade 500ml 10,00 | Energético Monster 473ml 12,00 | Soda Italiana 12,90 (options: Maçã Verde, Granadine, Cranberry) | Energético Red Bull 250ml 15,00



SUCOS

Suco Del Vale 290ml 7,00 | Suco de Laranja Mitz 300ml 8,90 | Suco de Laranja Mitz 900ml 12,90 | Suco Natural 300ml 12,90 | Suco Natural com Leite 300ml 14,90 | Jarra de Suco Natural 1,2L 30,00. Os três últimos naturais têm options de sabor: Abacaxi, Abacaxi com Manjericão, Abacaxi com Hortelã, Morango, Maracujá, Limão.



CHOPP

Chopp Pilsen Gauden 400ml 12,00 | Chopp de Vinho 400ml 12,00 | Submarino Gauden 400ml 21,90



CERVEJAS

Sol Long Neck 355ml 9,90 | Heineken Long Neck 355ml 11,90 | Heineken Long Neck Zero 355ml 11,90 | Patagônia Amber Lager 473ml 12,90 | Patagônia IPA 473ml 12,90 | Smirnoff Ice 12,90 | Original 600ml 15,90 | Heineken 600ml 18,90



BALDES

Balde Sol Long Neck (6 un) 54,90 | Balde Heineken Long Neck (6 un) 67,90 | Balde Original 600ml (5 un) 74,90 | Balde Heineken 600ml (5 un) 89,90



DRINKS SEM ÁLCOOL

Arco-íris | 15,90 | Suco de laranja, isotônico azul, xarope de granadine e gelo

Tropical | 15,90 | Frutas, xarope de maçã verde, água com gás e gelo



DRINKS

Saquerinha (saquê) 17,90 (options: Abacaxi, Limão, Morango, Maracujá) | Caipirinha de Vinho 17,90 (vinho tinto, limão, açúcar) | Caipirinha (cachaça) 19,90 (options: Abacaxi, Limão, Morango, Maracujá) | Caipiroska (vodka) 19,90 (mesmas options) | Caipirinha de Licor de Banana 19,90 | Cuba Libre 20,90 (rum, Coca Cola, limão) | Mojito 20,90 (rum, limão, hortelã, água com gás, açúcar) | Garibaldi 20,90 (Campari e suco de laranja) | Tinto de Verano 22,90 (vinho tinto, tônica, laranja) | Aperol Spritz 23,90 (Aperol, vinho branco, água com gás) | Suco da Confusão 23,90 (leite condensado, morango e H2O em pedra) | Tequila Sunrise 24,90 (tequila, granadine, suco de laranja) | Moscow Mule 24,90 (vodka, xarope de gengibre, limão, hortelã, água com gás, espuma de gengibre) | Cosmopolitan 24,90 (vodka, cranberry, limão) | Fantasia 24,90 (vodka, curaçau blue, laranja, granadine) | Blue Marguerita 24,90 (tequila, curaçau blue, limão, açúcar) | Jack Coke 25,90 | Piña Colada 25,90 (rum, abacaxi, leite de coco, leite condensado, creme de leite) | Maracujack 28,90 (Jack Daniel's, maracujá, açúcar, hortelã) | Negroni 29,90 (Campari, vermouth rosso, gin, laranja)



DOSES

Rum Bacardi 8,90 | Vodka Smirnoff 9,90 | Steinhaeger 11,90 | Cachaça Mineira 12,90 (options: Branca, Ouro) | Conhaque Domecq 12,90 | Underberg 12,90 | Campari 14,90 | Grappa 14,90 | Limoncello 16,90 | Whisky Red Label 19,90 | Licor de Banana 20,90 | Tequila 24,90 (options: Branca, Ouro) | Whisky Jack Daniel's 24,90 | Jagermeister 24,90 | Licor 43 24,90



SOBREMESAS

Brigadeiro de Colher | 8,90 | Brigadeiro cremoso gourmet

Affogato | 14,90 | Sorvete de creme com café coado

Banana Nevada Cor7 | 20,90 | Banana, brigadeiro, sorvete de creme e queijo gratinado

Mini Churros | 22,90 | 12 mini churros e doce de leite cremoso gourmet

Petit Gateau de Chocolate | 22,90 | Bolo cremoso, sorvete de creme, amendoim e calda de chocolate

Brownie de Chocolate | 24,90 | Sorvete de creme e calda artesanal de frutas vermelhas



CAFÉS

Café 4,00 | Chá Quente 8,90 (note: "Consultar sabores") | Café com Leite 9,90 | Chocolate Quente 10,90 | Cappuccino 11,90 | Café com Leite e Creme de Avelã 14,90



VINHOS (nota: "Taxa de rolha R$ 20,00" em destaque no topo da categoria)

Taças: Vinho Branco Português 14,90 | Vinho Tinto Português 14,90

Espumantes: Gotas D'or Branco (Serra Gaúcha) 39,00 | Gotas D'or Rosé (Serra Gaúcha) 39,00

Brancos: Alecrim Blend (Portugal) 69,00 | Chac-Chac Sauvignon Blanc (Argentina) 58,00 | Prófugo Sauvignon Blanc (Argentina) 69,00 | Chafariz D. Maria Blend (Portugal) 65,00

Rosé: Chac-Chac Malbec (Argentina) 58,00

Tintos: Benjamin Cabernet Sauvignon (Argentina) 63,00 | Cordero con Piel de Lobo Malbec (Argentina) 67,00 | Abrasado Malbec (Argentina) 69,00 | Chac-Chac Malbec (Argentina) 77,00 | Benjamin Malbec (Argentina) 83,00 | D.V. Catena Cabernet-Malbec (Argentina) 180,00 | Arbo Cabernet Sauvignon (RS) 58,00 | Arbo Merlot (RS) 59,00 | Arbo Tannat (RS) 59,00 | Casa Perini Cabernet Sauvignon (RS) 92,00 | Casa Perini Merlot (RS) 92,00 | Casa Perini Tannat (RS) 98,00 | Balduzzi Cabernet Sauvignon (Chile) 58,00 | Balduzzi Carménère (Chile) 67,00 | Prófugo Cabernet Sauvignon (Chile) 79,00 | Valsierra Carménère (Chile) 84,00 | Valsierra Reserva Cabernet Sauvignon (Chile) 85,00 | Alecrim Blend (Portugal) 55,00 | Chafariz D. Maria Blend (Portugal) 58,00



Entregue o app funcionando, sem placeholders, com todas as categorias acima.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fdb7987e-0fe4-4fbf-b35d-157d4d5aa8b6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
