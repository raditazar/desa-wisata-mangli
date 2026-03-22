import { apiClient } from "../api-client";

export interface CreateOrderPayload {
  full_name: string;
  phone_number: string;
  email: string;
  visit_date: string;
  payment_method: "midtrans" | "cash";
  items: Array<{
    ticket_type_id: string; // The future Ticket Type UUID from backend
    quantity: number;
  }>;
}

export interface MidtransResponse {
  token: string;
  redirect_url: string;
}

export const ordersApi = {
  createOrder: async (payload: CreateOrderPayload) => {
    return apiClient.post<{ success: boolean; data: any }>("/orders", payload);
  },

  initializePayment: async (orderId: string) => {
    return apiClient.post<{ success: boolean; data: MidtransResponse }>(`/payments/midtrans/${orderId}`);
  },
};
