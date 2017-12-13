class OrdersController < ApplicationController
  def index
    @orders = Order.new(include_order_items: true, 
    include_order_status: true,
    include_order_item_artwork: true,
    include_order_agency: true,
    include_order_campaign: true).all.parsed_response
  end
end
