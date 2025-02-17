export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: Date;
}

export interface OrderItem {
  name: string;
  quantity: number;
  notes?: string;
  type: number;
}

export interface ProductType {
  IdTipoProduto: number;
  TipoProduto?: string;
}

export const ITEM_TYPES = [
  { value: 'drink', label: 'Bebida' },
  { value: 'side', label: 'Acompanhamento' },
  { value: 'main', label: 'Prato Principal' }
] as const;

