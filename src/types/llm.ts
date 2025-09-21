export interface LLMRequest {
  request_id: string;
  timestamp: string; // ISO 8601
  user_id?: string | null;
  provider: string;
  model: string;
  endpoint: string;
  prompt_tokens: number;
  completion_tokens: number;
  latency_ms: number;
  status: 'success' | 'error' | 'timeout' | string;
  cost_usd?: number;
  error_message?: string | null;
}
