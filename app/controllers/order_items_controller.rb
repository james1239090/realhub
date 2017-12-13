class OrderItemsController < ApplicationController
  def update
    @order_item = OrderItem.new()
    @order_item.update(params[:id], params[:status]).parsed_response
    respond_to do |format|
      format.json { render json: @order_item }
    end
  end
end
