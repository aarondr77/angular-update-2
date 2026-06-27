export interface Order {
  id: string;
  symbol: string;
  side: 'Buy' | 'Sell';
  quantity: number;
  status: 'Open' | 'Review' | 'Filled';
  desk: 'Institutional' | 'Standard';
  trader: string;
  notional: number;
  lastUpdated: string;
  executionHistory: number[];
}

export interface AuthUser {
  username: string;
  token: string;
  displayName: string;
}

export interface NotificationPreference {
  id: string;
  label: string;
  enabled: boolean;
  category: 'email' | 'sms' | 'inApp';
}
