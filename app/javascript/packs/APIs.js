const API = {
  updateOrderItemStatus(item_id, status, token) {
    return fetch(`/order_items/${item_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        status: status
      }),
      credentials: 'same-origin'
    });
  },
  getStatuses() {
    return fetch(`/statuses.json`).then(response => response.json());
  }
};
export default API;
