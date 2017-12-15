require "rails_helper"
RSpec.describe OrdersController do
  describe "#index" do
    it "response is success" do

      stub_request(:get, "https://www.realhubapp.com/api/v2/orders.json?include_order_agency=true&include_order_campaign=true&include_order_item_artwork=true&include_order_items=true&include_order_status=true").
        with(headers: {'X-Api-Token'=> ENV['api_token']}).
        to_return(status: 200, body: "", headers: {})

      get :index
      expect(response.success?).to eq true
    end
  end
end
