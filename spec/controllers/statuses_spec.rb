require "rails_helper"
RSpec.describe StatusesController do
  describe "#index" do
    it "response is success" do

      stub_request(:get, "https://www.realhubapp.com/api/v2/statuses.json").
        with(headers: {'X-Api-Token'=> ENV['api_token']}).
        to_return(status: 200, body: "", headers: {})

      get :index, format: :json

      expect(response).to be_success
    end
  end
end
