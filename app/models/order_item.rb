class OrderItem
  include HTTParty
  format :json
  base_uri 'https://www.realhubapp.com/api/v2'

  def initialize(**query)
    @options = { query: query,
                 headers: {"x-api-token": ENV['api_token']}}
  end
  def update(id,status)
    @options[:query] = {status: status}
    self.class.put("/order_items/#{id}.json", @options)
  end
end
