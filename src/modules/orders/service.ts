import { OrderRepository } from "./repository";

export async function getOrdersForUser(userId: string) {
  return OrderRepository.findManyByUserId(userId);
}

export async function getOrderForUser(userId: string, orderId: string) {
  return OrderRepository.findByIdAndUserId(orderId, userId);
}

export async function getAllOrders() {
  return OrderRepository.findAll();
}

export async function updateOrderStatus(orderId: string, status: string) {
  return OrderRepository.updateStatus(orderId, status);
}
