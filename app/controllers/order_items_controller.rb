class OrderItemsController < ApplicationController
    def update
        @order_item = OrderItem.new()
        @order_item.update(params[:id], params[:status])
    end
end
