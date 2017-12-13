class Status
    include HTTParty
    format :json
    base_uri 'https://www.realhubapp.com/api/v2'

    def initialize(**query)
        @options = { query:  query,
                    headers: {"x-api-token": ""}}
    end
    def all
        self.class.get("/statuses.json", @options)
    end
end