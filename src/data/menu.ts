export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  note?: string;
  options?: readonly string[];
  group?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  note?: string;
  items: readonly MenuItem[];
};

const JUICE_FLAVORS = [
  "Abacaxi",
  "Abacaxi com Manjericão",
  "Abacaxi com Hortelã",
  "Morango",
  "Maracujá",
  "Limão",
] as const;

const CAIPIRINHA_FLAVORS = ["Abacaxi", "Limão", "Morango", "Maracujá"] as const;

const ZERO_OPTIONS = ["Normal", "Zero"] as const;

export const menu: readonly MenuCategory[] = [
  {
    id: "pratos-executivos",
    name: "Pratos Executivos",
    items: [
      {
        id: "prato-infantil",
        name: "Prato Infantil",
        price: 14.9,
        description: "Nuggets de frango, batata frita, arroz branco e feijão preto",
      },
      {
        id: "frango-frito",
        name: "Frango Frito",
        price: 19.9,
        description: "Arroz branco, feijão preto, farofa da casa e salada mista",
      },
      {
        id: "strogonoff-de-frango",
        name: "Strogonoff de Frango",
        price: 19.9,
        description: "Arroz branco, farofa da casa, batata palha e salada mista",
      },
      {
        id: "carne-de-panela",
        name: "Carne de Panela",
        price: 19.9,
        description: "Arroz branco, feijão preto, farofa da casa e salada mista",
      },
      {
        id: "porco-no-tacho",
        name: "Porco no Tacho",
        price: 19.9,
        description: "Arroz branco, feijão preto, farofa da casa e salada mista",
      },
      {
        id: "massa-ao-molho-sugo",
        name: "Massa ao Molho Sugo",
        price: 19.9,
        description: "Molho de tomate artesanal e queijo parmesão",
      },
      {
        id: "feijoada-cor7",
        name: "Feijoada Cor7",
        price: 31.9,
        description:
          "Feijoada especial, arroz, couve, laranja, torresmo, farofa, vinagrete e banana na chapa",
        note: "Sábados, 11h às 15h",
      },
      { id: "extra-ovo-frito", name: "Ovo Frito", price: 1.5, group: "Extras dos Executivos" },
      {
        id: "extra-salada-mista",
        name: "Salada Mista",
        price: 2.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-batata-frita",
        name: "Batata Frita",
        price: 6.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-carne-do-executivo",
        name: "Carne do Executivo",
        price: 9.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-linguica-toscana",
        name: "Linguiça Toscana",
        price: 14.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-file-de-frango-na-chapa",
        name: "Filé de Frango na Chapa",
        price: 15.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-file-de-tilapia-na-chapa",
        name: "Filé de Tilápia na Chapa",
        price: 18.9,
        group: "Extras dos Executivos",
      },
      {
        id: "extra-contrafile-na-chapa",
        name: "Contrafilé na Chapa",
        price: 18.9,
        group: "Extras dos Executivos",
      },
    ],
  },
  {
    id: "pratos-especiais",
    name: "Pratos Especiais",
    items: [
      {
        id: "salada-cor7",
        name: "Salada Cor7",
        price: 22.0,
        description:
          "Alface, cebola, tomate, rúcula, maçã, azeitonas, ovos de codorna, pepino agridoce, croutons e salsinha",
      },
      {
        id: "massa-a-bolonhesa",
        name: "Massa à Bolonhesa",
        price: 22.9,
        description: "Molho de tomate artesanal e carne moída",
      },
      {
        id: "linguica-toscana",
        name: "Linguiça Toscana",
        price: 23.9,
        description: "Linguiça assada, arroz, feijão preto, farofa e salada mista",
      },
      {
        id: "frango-a-parmegiana",
        name: "Frango à Parmegiana",
        price: 23.9,
        description:
          "Frango empanado, molho de tomate, queijo, arroz, feijão preto, farofa e salada mista",
      },
      {
        id: "carne-de-onca",
        name: "Carne de Onça",
        price: 27.9,
        description:
          "Broa integral, carne moída, cebola, cebolinha, pimenta biquinho, temperos e mostarda escura",
        note: "Quinta a sábado",
      },
      {
        id: "legumes-salteados-com-frango",
        name: "Legumes Salteados com Frango",
        price: 28.9,
        description: "Legumes na manteiga com filé de frango acebolado",
      },
      {
        id: "legumes-salteados-com-tilapia",
        name: "Legumes Salteados com Tilápia",
        price: 28.9,
        description: "Legumes na manteiga com filé de tilápia",
      },
      {
        id: "legumes-salteados-com-contrafile",
        name: "Legumes Salteados com Contrafilé",
        price: 28.9,
        description: "Legumes na manteiga com contrafilé acebolado",
      },
      {
        id: "file-de-frango-na-chapa",
        name: "Filé de Frango na Chapa",
        price: 34.9,
        description: "Frango acebolado, batata frita, arroz, feijão preto, farofa e salada mista",
      },
      {
        id: "massa-a-la-carbonara-da-casa",
        name: "Massa à La Carbonara da Casa",
        price: 39.0,
        description: "Molho branco, bacon e parmesão",
      },
      {
        id: "contrafile-na-chapa",
        name: "Contrafilé na Chapa",
        price: 39.9,
        description: "Acebolado, batata frita, arroz, feijão preto, farofa e salada mista",
      },
      {
        id: "file-de-tilapia-na-chapa",
        name: "Filé de Tilápia na Chapa",
        price: 39.9,
        description: "Arroz, feijão preto, farofa e salada mista",
      },
      {
        id: "massa-ao-molho-sugo-com-contrafile",
        name: "Massa ao Molho Sugo com Contrafilé",
        price: 42.0,
        description: "Molho de tomate artesanal, contrafilé e parmesão",
      },
      {
        id: "massa-ao-molho-branco-com-camarao",
        name: "Massa ao Molho Branco com Camarão",
        price: 56.0,
        description: "Molho branco, camarão e parmesão",
      },
    ],
  },
  {
    id: "cardapio-de-inverno",
    name: "Cardápio de Inverno",
    items: [
      {
        id: "caldinho-de-feijao",
        name: "Caldinho de Feijão (caneca)",
        price: 12.9,
        description: "Feijão preto, calabresa, bacon e torradas",
      },
      { id: "quentao", name: "Quentão", price: 12.0 },
      {
        id: "creme-de-mandioca",
        name: "Creme de Mandioca",
        price: 22.0,
        description: "Mandioca, batata, calabresa, bacon, cheiro verde e torradas",
      },
      {
        id: "polenta-com-ragu",
        name: "Polenta com Ragu",
        price: 22.0,
        options: ["Carne", "Frango"],
      },
      {
        id: "caldo-verde",
        name: "Caldo Verde",
        price: 22.0,
        description: "Mandioca, batata, couve manteiga, calabresa, bacon, cheiro verde e torradas",
      },
      {
        id: "sopa-de-feijao",
        name: "Sopa de Feijão",
        price: 22.0,
        description: "Macarrão, feijão preto, calabresa, bacon, cheiro verde e torradas",
      },
      {
        id: "sopa-de-legumes",
        name: "Sopa de Legumes",
        price: 22.0,
        description:
          "Macarrão, abobrinha, cenoura, repolho, couve, batata, batata salsa, cheiro verde e torradas",
      },
      {
        id: "sopa-de-carne-com-legumes",
        name: "Sopa de Carne com Legumes",
        price: 22.0,
        description:
          "Macarrão, carne, abobrinha, cenoura, repolho, couve, batata, batata salsa, cheiro verde e torradas",
      },
    ],
  },
  {
    id: "porcoes",
    name: "Porções",
    items: [
      { id: "bolinho-de-bacalhau", name: "Bolinho de Bacalhau (6 un)", price: 19.9 },
      {
        id: "bolinho-de-mandioca-com-carne-seca",
        name: "Bolinho de Mandioca com Carne Seca (5 un)",
        price: 19.9,
      },
      { id: "polenta-frita", name: "Polenta Frita 400g", price: 23.9 },
      { id: "batata-frita-porcao", name: "Batata Frita 400g", price: 27.9 },
      { id: "mini-coxinha-de-frango", name: "Mini Coxinha de Frango (10 un)", price: 27.9 },
      {
        id: "medalhao-de-mandioca-com-bacon",
        name: "Medalhão de Mandioca com Bacon 300g",
        price: 28.9,
      },
      { id: "mandioca-porcao", name: "Mandioca 400g", price: 28.9 },
      { id: "calabresa-na-chapa", name: "Calabresa na Chapa 400g", price: 29.9 },
      { id: "aneis-de-cebola", name: "Anéis de Cebola 300g", price: 29.9 },
      { id: "frango-a-passarinho", name: "Frango a Passarinho 600g", price: 39.9 },
      { id: "coracao-de-frango", name: "Coração de Frango 400g", price: 39.9 },
      { id: "torresmo", name: "Torresmo 300g", price: 41.9 },
      {
        id: "contrafile-em-tiras-com-batatas",
        name: "Contrafilé em Tiras com Batatas 600g",
        price: 65.9,
      },
      { id: "iscas-de-tilapia", name: "Iscas de Tilápia 400g", price: 72.9 },
      {
        id: "picanha-em-tiras-com-batatas",
        name: "Picanha em Tiras com Batatas 600g",
        price: 77.9,
      },
      {
        id: "porcao-2-amores",
        name: "2 Amores",
        price: 92.9,
        description: "Iscas de tilápia, batata frita e maionese Cor7",
      },
      {
        id: "porcao-cor7",
        name: "Cor7",
        price: 97.9,
        description:
          "Batata frita, anéis de cebola, contrafilé acebolado, frango a passarinho e maionese Cor7",
      },
      {
        id: "porcao-familia",
        name: "Família",
        price: 109.9,
        description:
          "Batata frita, polenta frita, calabresa acebolada, frango a passarinho e maionese Cor7",
      },
      { id: "adicional-de-queijo", name: "Adicional de Queijo", price: 4.9 },
      { id: "adicional-de-bacon", name: "Adicional de Bacon", price: 6.9 },
    ],
  },
  {
    id: "pasteis",
    name: "Pastéis",
    items: [
      { id: "pastel-carne", name: "Carne", price: 10.9 },
      { id: "pastel-queijo", name: "Queijo", price: 10.9 },
      { id: "pastel-carne-com-queijo", name: "Carne com Queijo", price: 12.9 },
      { id: "pastel-brigadeiro", name: "Brigadeiro", price: 12.9 },
      { id: "pastel-costela-com-queijo", name: "Costela com Queijo", price: 16.9 },
    ],
  },
  {
    id: "sanduiches",
    name: "Sanduíches",
    note: "Todos com pão francês, maionese Cor7 e salsinha",
    items: [
      {
        id: "pao-com-linguica",
        name: "Pão com Linguiça",
        price: 18.9,
        description: "Linguiça toscana assada, queijo e vinagrete",
      },
      {
        id: "pao-com-frango",
        name: "Pão com Frango",
        price: 19.9,
        description: "Filé de frango e queijo",
      },
      {
        id: "pao-com-porco-no-tacho",
        name: "Pão com Porco no Tacho",
        price: 22.9,
        description: "Porco no tacho, queijo e batata palha",
      },
      {
        id: "pao-com-bolinho-de-carne",
        name: "Pão com Bolinho de Carne",
        price: 25.9,
        description: "Bolinho de carne artesanal, queijo e vinagrete",
      },
      {
        id: "pao-com-coracao-de-frango",
        name: "Pão com Coração de Frango",
        price: 25.9,
        description: "Coração de frango, cebola na chapa e queijo",
      },
      {
        id: "pao-com-contrafile-em-tiras",
        name: "Pão com Contrafilé em Tiras",
        price: 28.9,
        description: "Contrafilé acebolado, queijo e vinagrete",
      },
      {
        id: "pao-com-costela",
        name: "Pão com Costela",
        price: 28.9,
        description: "Costela assada desfiada, queijo e pepino agridoce",
      },
    ],
  },
  {
    id: "hamburgueres",
    name: "Hambúrgueres",
    note: "Todos com batatas fritas",
    items: [
      {
        id: "hamburguer-de-frango",
        name: "Hambúrguer de Frango",
        price: 30.9,
        description:
          "Filé de frango acebolado, queijo, maionese Cor7, alface, pepino agridoce e salsinha",
      },
      {
        id: "hamburguer-de-carne",
        name: "Hambúrguer de Carne",
        price: 35.9,
        description:
          "Hambúrguer artesanal, queijo, maionese Cor7, rúcula, pepino agridoce e cebola na chapa",
      },
      {
        id: "hamburguer-cor7",
        name: "Hambúrguer Cor7",
        price: 39.9,
        description:
          "Contrafilé em tiras acebolado, queijo, maionese Cor7, bacon, alface, rúcula e pepino agridoce",
      },
      {
        id: "hamburguer-de-costela",
        name: "Hambúrguer de Costela",
        price: 39.9,
        description:
          "Costela desfiada, anéis de cebola, queijo, maionese Cor7, alface, rúcula e pepino agridoce",
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    items: [
      { id: "agua-500ml", name: "Água 500ml", price: 4.0, options: ["Sem gás", "Com gás"] },
      { id: "coca-cola-310ml", name: "Coca Cola 310ml", price: 6.9, options: ZERO_OPTIONS },
      { id: "guarana-350ml", name: "Guaraná 350ml", price: 6.9, options: ZERO_OPTIONS },
      { id: "tonica-350ml", name: "Tônica 350ml", price: 6.9, options: ZERO_OPTIONS },
      { id: "isotonico-powerade-500ml", name: "Isotônico Powerade 500ml", price: 10.0 },
      { id: "coca-cola-600ml", name: "Coca Cola 600ml", price: 10.9, options: ZERO_OPTIONS },
      { id: "guarana-600ml", name: "Guaraná 600ml", price: 10.9 },
      { id: "energetico-monster-473ml", name: "Energético Monster 473ml", price: 12.0 },
      {
        id: "soda-italiana",
        name: "Soda Italiana",
        price: 12.9,
        options: ["Maçã Verde", "Granadine", "Cranberry"],
      },
      { id: "energetico-red-bull-250ml", name: "Energético Red Bull 250ml", price: 15.0 },
    ],
  },
  {
    id: "sucos",
    name: "Sucos",
    items: [
      { id: "suco-del-vale-290ml", name: "Suco Del Vale 290ml", price: 7.0 },
      { id: "suco-de-laranja-mitz-300ml", name: "Suco de Laranja Mitz 300ml", price: 8.9 },
      { id: "suco-de-laranja-mitz-900ml", name: "Suco de Laranja Mitz 900ml", price: 12.9 },
      {
        id: "suco-natural-300ml",
        name: "Suco Natural 300ml",
        price: 12.9,
        options: JUICE_FLAVORS,
      },
      {
        id: "suco-natural-com-leite-300ml",
        name: "Suco Natural com Leite 300ml",
        price: 14.9,
        options: JUICE_FLAVORS,
      },
      {
        id: "jarra-de-suco-natural-1200ml",
        name: "Jarra de Suco Natural 1,2L",
        price: 30.0,
        options: JUICE_FLAVORS,
      },
    ],
  },
  {
    id: "chopp",
    name: "Chopp",
    items: [
      { id: "chopp-pilsen-gauden-400ml", name: "Chopp Pilsen Gauden 400ml", price: 12.0 },
      { id: "chopp-de-vinho-400ml", name: "Chopp de Vinho 400ml", price: 12.0 },
      { id: "submarino-gauden-400ml", name: "Submarino Gauden 400ml", price: 21.9 },
    ],
  },
  {
    id: "cervejas",
    name: "Cervejas",
    items: [
      { id: "sol-long-neck-355ml", name: "Sol Long Neck 355ml", price: 9.9 },
      { id: "heineken-long-neck-355ml", name: "Heineken Long Neck 355ml", price: 11.9 },
      { id: "heineken-long-neck-zero-355ml", name: "Heineken Long Neck Zero 355ml", price: 11.9 },
      { id: "patagonia-amber-lager-473ml", name: "Patagônia Amber Lager 473ml", price: 12.9 },
      { id: "patagonia-ipa-473ml", name: "Patagônia IPA 473ml", price: 12.9 },
      { id: "smirnoff-ice", name: "Smirnoff Ice", price: 12.9 },
      { id: "original-600ml", name: "Original 600ml", price: 15.9 },
      { id: "heineken-600ml", name: "Heineken 600ml", price: 18.9 },
    ],
  },
  {
    id: "baldes",
    name: "Baldes",
    items: [
      { id: "balde-sol-long-neck", name: "Balde Sol Long Neck (6 un)", price: 54.9 },
      { id: "balde-heineken-long-neck", name: "Balde Heineken Long Neck (6 un)", price: 67.9 },
      { id: "balde-original-600ml", name: "Balde Original 600ml (5 un)", price: 74.9 },
      { id: "balde-heineken-600ml", name: "Balde Heineken 600ml (5 un)", price: 89.9 },
    ],
  },
  {
    id: "drinks-sem-alcool",
    name: "Drinks sem Álcool",
    items: [
      {
        id: "arco-iris",
        name: "Arco-íris",
        price: 15.9,
        description: "Suco de laranja, isotônico azul, xarope de granadine e gelo",
      },
      {
        id: "tropical",
        name: "Tropical",
        price: 15.9,
        description: "Frutas, xarope de maçã verde, água com gás e gelo",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    items: [
      {
        id: "saquerinha",
        name: "Saquerinha",
        price: 17.9,
        description: "Saquê",
        options: CAIPIRINHA_FLAVORS,
      },
      {
        id: "caipirinha-de-vinho",
        name: "Caipirinha de Vinho",
        price: 17.9,
        description: "Vinho tinto, limão e açúcar",
      },
      {
        id: "caipirinha",
        name: "Caipirinha",
        price: 19.9,
        description: "Cachaça",
        options: CAIPIRINHA_FLAVORS,
      },
      {
        id: "caipiroska",
        name: "Caipiroska",
        price: 19.9,
        description: "Vodka",
        options: CAIPIRINHA_FLAVORS,
      },
      { id: "caipirinha-de-licor-de-banana", name: "Caipirinha de Licor de Banana", price: 19.9 },
      {
        id: "cuba-libre",
        name: "Cuba Libre",
        price: 20.9,
        description: "Rum, Coca Cola e limão",
      },
      {
        id: "mojito",
        name: "Mojito",
        price: 20.9,
        description: "Rum, limão, hortelã, água com gás e açúcar",
      },
      { id: "garibaldi", name: "Garibaldi", price: 20.9, description: "Campari e suco de laranja" },
      {
        id: "tinto-de-verano",
        name: "Tinto de Verano",
        price: 22.9,
        description: "Vinho tinto, tônica e laranja",
      },
      {
        id: "aperol-spritz",
        name: "Aperol Spritz",
        price: 23.9,
        description: "Aperol, vinho branco e água com gás",
      },
      {
        id: "suco-da-confusao",
        name: "Suco da Confusão",
        price: 23.9,
        description: "Leite condensado, morango e H2O em pedra",
      },
      {
        id: "tequila-sunrise",
        name: "Tequila Sunrise",
        price: 24.9,
        description: "Tequila, granadine e suco de laranja",
      },
      {
        id: "moscow-mule",
        name: "Moscow Mule",
        price: 24.9,
        description: "Vodka, xarope de gengibre, limão, hortelã, água com gás e espuma de gengibre",
      },
      {
        id: "cosmopolitan",
        name: "Cosmopolitan",
        price: 24.9,
        description: "Vodka, cranberry e limão",
      },
      {
        id: "fantasia",
        name: "Fantasia",
        price: 24.9,
        description: "Vodka, curaçau blue, laranja e granadine",
      },
      {
        id: "blue-marguerita",
        name: "Blue Marguerita",
        price: 24.9,
        description: "Tequila, curaçau blue, limão e açúcar",
      },
      { id: "jack-coke", name: "Jack Coke", price: 25.9 },
      {
        id: "pina-colada",
        name: "Piña Colada",
        price: 25.9,
        description: "Rum, abacaxi, leite de coco, leite condensado e creme de leite",
      },
      {
        id: "maracujack",
        name: "Maracujack",
        price: 28.9,
        description: "Jack Daniel's, maracujá, açúcar e hortelã",
      },
      {
        id: "negroni",
        name: "Negroni",
        price: 29.9,
        description: "Campari, vermouth rosso, gin e laranja",
      },
    ],
  },
  {
    id: "doses",
    name: "Doses",
    items: [
      { id: "rum-bacardi", name: "Rum Bacardi", price: 8.9 },
      { id: "vodka-smirnoff", name: "Vodka Smirnoff", price: 9.9 },
      { id: "steinhaeger", name: "Steinhaeger", price: 11.9 },
      {
        id: "cachaca-mineira",
        name: "Cachaça Mineira",
        price: 12.9,
        options: ["Branca", "Ouro"],
      },
      { id: "conhaque-domecq", name: "Conhaque Domecq", price: 12.9 },
      { id: "underberg", name: "Underberg", price: 12.9 },
      { id: "campari", name: "Campari", price: 14.9 },
      { id: "grappa", name: "Grappa", price: 14.9 },
      { id: "limoncello", name: "Limoncello", price: 16.9 },
      { id: "whisky-red-label", name: "Whisky Red Label", price: 19.9 },
      { id: "licor-de-banana", name: "Licor de Banana", price: 20.9 },
      { id: "tequila", name: "Tequila", price: 24.9, options: ["Branca", "Ouro"] },
      { id: "whisky-jack-daniels", name: "Whisky Jack Daniel's", price: 24.9 },
      { id: "jagermeister", name: "Jagermeister", price: 24.9 },
      { id: "licor-43", name: "Licor 43", price: 24.9 },
    ],
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    items: [
      {
        id: "brigadeiro-de-colher",
        name: "Brigadeiro de Colher",
        price: 8.9,
        description: "Brigadeiro cremoso gourmet",
      },
      {
        id: "affogato",
        name: "Affogato",
        price: 14.9,
        description: "Sorvete de creme com café coado",
      },
      {
        id: "banana-nevada-cor7",
        name: "Banana Nevada Cor7",
        price: 20.9,
        description: "Banana, brigadeiro, sorvete de creme e queijo gratinado",
      },
      {
        id: "mini-churros",
        name: "Mini Churros",
        price: 22.9,
        description: "12 mini churros e doce de leite cremoso gourmet",
      },
      {
        id: "petit-gateau-de-chocolate",
        name: "Petit Gateau de Chocolate",
        price: 22.9,
        description: "Bolo cremoso, sorvete de creme, amendoim e calda de chocolate",
      },
      {
        id: "brownie-de-chocolate",
        name: "Brownie de Chocolate",
        price: 24.9,
        description: "Sorvete de creme e calda artesanal de frutas vermelhas",
      },
    ],
  },
  {
    id: "cafes",
    name: "Cafés",
    items: [
      { id: "cafe", name: "Café", price: 4.0 },
      { id: "cha-quente", name: "Chá Quente", price: 8.9, note: "Consultar sabores" },
      { id: "cafe-com-leite", name: "Café com Leite", price: 9.9 },
      { id: "chocolate-quente", name: "Chocolate Quente", price: 10.9 },
      { id: "cappuccino", name: "Cappuccino", price: 11.9 },
      {
        id: "cafe-com-leite-e-creme-de-avela",
        name: "Café com Leite e Creme de Avelã",
        price: 14.9,
      },
    ],
  },
  {
    id: "vinhos",
    name: "Vinhos",
    note: "Taxa de rolha R$ 20,00",
    items: [
      {
        id: "taca-vinho-branco-portugues",
        name: "Vinho Branco Português",
        price: 14.9,
        group: "Taças",
      },
      {
        id: "taca-vinho-tinto-portugues",
        name: "Vinho Tinto Português",
        price: 14.9,
        group: "Taças",
      },
      {
        id: "gotas-dor-branco",
        name: "Gotas D'or Branco (Serra Gaúcha)",
        price: 39.0,
        group: "Espumantes",
      },
      {
        id: "gotas-dor-rose",
        name: "Gotas D'or Rosé (Serra Gaúcha)",
        price: 39.0,
        group: "Espumantes",
      },
      {
        id: "chac-chac-sauvignon-blanc",
        name: "Chac-Chac Sauvignon Blanc (Argentina)",
        price: 58.0,
        group: "Brancos",
      },
      {
        id: "chafariz-d-maria-blend-branco",
        name: "Chafariz D. Maria Blend (Portugal)",
        price: 65.0,
        group: "Brancos",
      },
      {
        id: "alecrim-blend-branco",
        name: "Alecrim Blend (Portugal)",
        price: 69.0,
        group: "Brancos",
      },
      {
        id: "profugo-sauvignon-blanc",
        name: "Prófugo Sauvignon Blanc (Argentina)",
        price: 69.0,
        group: "Brancos",
      },
      {
        id: "chac-chac-malbec-rose",
        name: "Chac-Chac Malbec (Argentina)",
        price: 58.0,
        group: "Rosé",
      },
      {
        id: "arbo-cabernet-sauvignon",
        name: "Arbo Cabernet Sauvignon (RS)",
        price: 58.0,
        group: "Tintos",
      },
      {
        id: "balduzzi-cabernet-sauvignon",
        name: "Balduzzi Cabernet Sauvignon (Chile)",
        price: 58.0,
        group: "Tintos",
      },
      {
        id: "chafariz-d-maria-blend-tinto",
        name: "Chafariz D. Maria Blend (Portugal)",
        price: 58.0,
        group: "Tintos",
      },
      { id: "arbo-merlot", name: "Arbo Merlot (RS)", price: 59.0, group: "Tintos" },
      { id: "arbo-tannat", name: "Arbo Tannat (RS)", price: 59.0, group: "Tintos" },
      {
        id: "alecrim-blend-tinto",
        name: "Alecrim Blend (Portugal)",
        price: 55.0,
        group: "Tintos",
      },
      {
        id: "benjamin-cabernet-sauvignon",
        name: "Benjamin Cabernet Sauvignon (Argentina)",
        price: 63.0,
        group: "Tintos",
      },
      {
        id: "cordero-con-piel-de-lobo-malbec",
        name: "Cordero con Piel de Lobo Malbec (Argentina)",
        price: 67.0,
        group: "Tintos",
      },
      {
        id: "balduzzi-carmenere",
        name: "Balduzzi Carménère (Chile)",
        price: 67.0,
        group: "Tintos",
      },
      {
        id: "abrasado-malbec",
        name: "Abrasado Malbec (Argentina)",
        price: 69.0,
        group: "Tintos",
      },
      {
        id: "chac-chac-malbec-tinto",
        name: "Chac-Chac Malbec (Argentina)",
        price: 77.0,
        group: "Tintos",
      },
      {
        id: "profugo-cabernet-sauvignon",
        name: "Prófugo Cabernet Sauvignon (Chile)",
        price: 79.0,
        group: "Tintos",
      },
      {
        id: "benjamin-malbec",
        name: "Benjamin Malbec (Argentina)",
        price: 83.0,
        group: "Tintos",
      },
      {
        id: "valsierra-carmenere",
        name: "Valsierra Carménère (Chile)",
        price: 84.0,
        group: "Tintos",
      },
      {
        id: "valsierra-reserva-cabernet-sauvignon",
        name: "Valsierra Reserva Cabernet Sauvignon (Chile)",
        price: 85.0,
        group: "Tintos",
      },
      {
        id: "casa-perini-cabernet-sauvignon",
        name: "Casa Perini Cabernet Sauvignon (RS)",
        price: 92.0,
        group: "Tintos",
      },
      { id: "casa-perini-merlot", name: "Casa Perini Merlot (RS)", price: 92.0, group: "Tintos" },
      { id: "casa-perini-tannat", name: "Casa Perini Tannat (RS)", price: 98.0, group: "Tintos" },
      {
        id: "dv-catena-cabernet-malbec",
        name: "D.V. Catena Cabernet-Malbec (Argentina)",
        price: 180.0,
        group: "Tintos",
      },
    ],
  },
];

export type CategoryGroup = {
  name: "Comidas" | "Bebidas" | "Bar";
  categoryIds: readonly string[];
};

export const categoryGroups: readonly CategoryGroup[] = [
  {
    name: "Comidas",
    categoryIds: [
      "pratos-executivos",
      "pratos-especiais",
      "cardapio-de-inverno",
      "porcoes",
      "pasteis",
      "sanduiches",
      "hamburgueres",
      "sobremesas",
    ],
  },
  {
    name: "Bebidas",
    categoryIds: ["bebidas", "sucos", "drinks-sem-alcool", "cafes"],
  },
  {
    name: "Bar",
    categoryIds: ["chopp", "cervejas", "baldes", "drinks", "doses", "vinhos"],
  },
] as const;

export const orderedMenu: readonly MenuCategory[] = categoryGroups
  .flatMap((group) => group.categoryIds.map((id) => menu.find((category) => category.id === id)))
  .filter((category): category is MenuCategory => category !== undefined);
