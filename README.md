# Galileia JV Camisas

Loja virtual de camisas de time — **Galileia Shop** — construída sobre React 19 + Vite + TypeScript + Tailwind CSS 4 + Motion (motion.dev).

## Como rodar

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # build de produção em dist/
npm run preview # preview do build
```

## Stack

| Pacote | Função |
|--------|--------|
| React 19 + Vite + TypeScript | Base |
| Tailwind CSS 4 (`@tailwindcss/vite`) | Estilos utilitários |
| `motion` (motion.dev) | Todas as animações |
| `lenis` | Smooth scroll com inércia |

## Estrutura

```
src/
├── App.tsx                  # Composição principal + live search
├── index.css                # Design tokens + classes utilitárias
├── data/
│   └── products.ts          # 139 produtos (editável manualmente)
├── components/
│   ├── Header.tsx           # Nav sticky com pill indicator + cart badge
│   ├── HeroCinematic.tsx    # Hero com split-text reveal + magnetic CTAs
│   ├── ProductCarousel.tsx  # Carrossel drag + paginação + lightbox
│   ├── ProductCard.tsx      # Card com tilt 3D + hover swap
│   ├── ProductLightbox.tsx  # Modal expandido com size picker + fly-to-cart
│   ├── SearchBar.tsx        # Barra de busca live com resultado count
│   ├── SearchResults.tsx    # Grid animado de resultados
│   ├── TrustBadges.tsx      # Selos de confiança
│   ├── SmoothScroll.tsx     # Wrapper Lenis
│   ├── ScrollProgress.tsx   # Barra de progresso no topo
│   └── Footer.tsx           # Footer com CTA WhatsApp + selos de segurança
├── cart/
│   ├── CartContext.tsx      # Estado global do carrinho (Context API)
│   ├── CartDrawer.tsx       # Drawer lateral com itens + qty controls
│   ├── CheckoutModal.tsx    # Modal 3 steps → envia pedido via WhatsApp
│   └── FlyToCartLayer.tsx   # Animação "voa para o carrinho"
public/
└── images/                  # Imagens dos produtos (hosting local)
```

## Dados dos produtos

### Edição manual
Os produtos estão em `src/data/products.ts`. Cada produto segue a interface:

```ts
interface Product {
  id: number;
  title: string;
  img: string;          // URL ou /images/arquivo.jpg
  imgHover: string;     // Imagem ao hover
  badge: string;        // ex: "PREMIUM", "NOVA"
  category: string;
  price: string;        // ex: "89,90"
  priceBundle?: string; // ex: "35,00" (para caixas com desconto)
  sizes: string[];      // ex: ["P", "M", "G", "GG", "XGG"]
  description: string;
  link: string;         // Link do produto no site original
}
```

### Atualização automática via WooCommerce API
O script `fetch-products.cjs` busca produtos diretamente da API pública do site original:

```bash
node fetch-products.cjs
```

**Site original**: https://playnodrop.com.br/  
**API endpoint**: `https://playnodrop.com.br/wp-json/wc/store/v1/products`

Parâmetros usados:
- `?category=ID` — filtra por categoria (IDs mapeados no script)
- `?per_page=100` — max por página
- `?page=N` — paginação

Categorias e IDs mapeados no script:
```
nacional    → category IDs que contêm "Nacional"
tailandesa  → category IDs que contêm "Tailandesa"
croppeds    → category IDs que contêm "Cropped"
bermudas    → category IDs que contêm "Bermuda"
caixas      → category IDs que contêm "Caixa"
```

**Regras de preço aplicadas pelo script:**
- `price` = preço atacado extraído do nome da categoria (regex `Atacado R\$(\d+),(\d+)`) × 1.20
- Bermudas: preço fixo R$ 60,00 (independente do atacado)
- Caixas: `price = "45,00"`, `priceBundle = "35,00"`
- Campo `priceOld` foi removido (não exibimos preço antigo)

**Tamanhos**: extraídos do atributo WooCommerce `pa_tamanho` → `attributes[].terms[]`

## WhatsApp de atendimento

Número: **(11) 93210-4773**  
Link direto: `https://wa.me/5511932104773`

O checkout envia o pedido via WhatsApp com nome, endereço, itens, tamanhos e forma de pagamento.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Galileia JV Camisas — v1"
git remote add origin https://github.com/SEU_USUARIO/GalileiaJVCamisas.git
git push -u origin main
```

## Deploy (Vercel / Netlify)

```bash
npm run build
# Pasta dist/ contém o build estático
# Vercel: importar repositório GitHub, build command = "npm run build", output = "dist"
```

## Cores do tema

```
--primary:       #2563EB  (azul elétrico)
--primary-light: #60A5FA
--primary-glow:  #38BDF8  (ciano)
--dark:          #050A1E
--dark-2:        #0a1530
```
