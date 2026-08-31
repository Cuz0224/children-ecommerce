/**
 * Centralized Route Parameters and Navigation Helper for Frontend
 * Platform: frontend
 */

export interface ParamMeta {
  source_table: string;
  source_column: string;
  description: string;
}

export interface AppRouterInstance {
  push: (href: string) => void;
  replace?: (href: string) => void;
  back?: () => void;
}

function buildUrl(path: string, params: Record<string, string>): string {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const query = sp.toString();
  return query ? `${path}?${query}` : path;
}

// ================================================================
// F01 StorefrontHome — 无入参
// ================================================================
export const StorefrontHome = {
  id: 'F01',
  path: '/',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(StorefrontHome.path),
};

// ================================================================
// F02 ProductDetail — 入参: productId
// ================================================================
export const ProductDetail = {
  id: 'F02',
  path: '/productdetail',
  paramsMeta: {
    productId: {
      source_table: 'ToyProduct',
      source_column: 'id',
      description: 'Toy product unique ID from ToyProduct.id (not CartItem.productId or SalesOrderItem.productId)',
    },
  },
  getParams: (() => {
    const cache = new WeakMap<URLSearchParams, { productId: string }>();
    return (sp: URLSearchParams) => {
      if (cache.has(sp)) return cache.get(sp)!;
      const result = { productId: sp.get('productId') || '' };
      cache.set(sp, result);
      return result;
    };
  })(),
  navigateTo: (router: AppRouterInstance, params: { productId: string }) =>
    router.push(buildUrl(ProductDetail.path, params)),
  navigateToDetail: (router: AppRouterInstance, params: { productId: string }) =>
    router.push(buildUrl(ProductDetail.path, params)),
};

// ================================================================
// F03 CustomerRegister — 无入参
// ================================================================
export const CustomerRegister = {
  id: 'F03',
  path: '/customerregister',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(CustomerRegister.path),
};

// ================================================================
// F04 CustomerLogin — 无入参
// ================================================================
export const CustomerLogin = {
  id: 'F04',
  path: '/customerlogin',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(CustomerLogin.path),
};

// ================================================================
// F05 Checkout — 无入参
// ================================================================
export const Checkout = {
  id: 'F05',
  path: '/checkout',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(Checkout.path),
};

// ================================================================
// F06 OrderHistory — 无入参
// ================================================================
export const OrderHistory = {
  id: 'F06',
  path: '/orderhistory',
  paramsMeta: {} as Record<string, ParamMeta>,
  getParams: (_sp: URLSearchParams) => ({}),
  navigateTo: (router: AppRouterInstance) => router.push(OrderHistory.path),
};

// ================================================================
// end
// ================================================================

export const FrontendRoutes = {
  StorefrontHome,
  ProductDetail,
  CustomerRegister,
  CustomerLogin,
  Checkout,
  OrderHistory,
};

export const NAVIGATION_MAP: Record<string, string[]> = {
  F01: ['F02', 'F05'],
  F02: ['F01', 'F05'],
  F03: ['F01', 'F04'],
  F04: ['F01', 'F03'],
  F05: ['F01', 'F06'],
  F06: ['F01'],
};

export const PAGE_ID_MAP: Record<string, string> = {
  F01: 'StorefrontHome',
  F02: 'ProductDetail',
  F03: 'CustomerRegister',
  F04: 'CustomerLogin',
  F05: 'Checkout',
  F06: 'OrderHistory',
};

/**
 * 传入页面 ID 或名称，从本文件源码中提取：当前页面 + 其所有跳转目标的 export const 代码块。
 * 支持 ID（F10）或名称（PaperCompose / papercompose），大小写不敏感。
 */
export function getRouteContextText(
  pageIdOrName: string,
  fileContent: string
): string {
  let pageId = pageIdOrName
  let currentName = PAGE_ID_MAP[pageId]

  if (!currentName) {
    const lowerInput = pageIdOrName.toLowerCase()
    const entry = Object.entries(PAGE_ID_MAP).find(
      ([, name]) => name.toLowerCase() === lowerInput
    )
    if (entry) {
      pageId = entry[0]
      currentName = entry[1]
    }
  }

  if (!currentName) return `// 错误：未找到页面 ${pageIdOrName}`

  const targetIds = NAVIGATION_MAP[pageId] || []
  const targetNames = targetIds.map((id) => PAGE_ID_MAP[id]).filter(Boolean)

  const lines = fileContent.split('\n')
  const blocks: Record<string, string> = {}
  let currentBlock: string[] = []
  let currentBlockName = ''

  for (const line of lines) {
    if (line.startsWith('// ====')) {
      if (currentBlockName && currentBlock.length > 0) {
        blocks[currentBlockName] = currentBlock.join('\n').trim()
      }
      currentBlock = [line]
      currentBlockName = ''
      continue
    }
    const exportMatch = line.match(/^export const (\w+)\s*=/)
    if (exportMatch && !currentBlockName) {
      currentBlockName = exportMatch[1]
    }
    currentBlock.push(line)
  }
  if (currentBlockName && currentBlock.length > 0) {
    blocks[currentBlockName] = currentBlock.join('\n').trim()
  }

  function getBlock(name: string): string {
    return blocks[name] || `// 未找到 ${name} 的定义`
  }

  const parts: string[] = []
  parts.push('// ★★★ 当前页面 ★★★')
  parts.push(getBlock(currentName))
  if (targetNames.length > 0) {
    parts.push('// ★★★ 跳转目标页面（当前页面会 navigateTo 以下页面）★★★')
    for (const name of targetNames) {
      parts.push(getBlock(name))
    }
  }
  return parts.join('\n\n')
}
