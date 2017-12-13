class StatusesController < ApplicationController
  def index
    @statuses = Status.new().all.parsed_response
    respond_to do |format|
      format.json { render json: @statuses }
    end
  end
end
