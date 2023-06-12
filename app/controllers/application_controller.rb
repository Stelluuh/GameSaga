# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
    include ActionController::Cookies
  
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
        
    private

    def render_not_found_response invalid
        render json: { error: "#{invalid.model} not found"}
    end

    def render_unprocessable_entity invalid
        render json: { errors: invalid.record.errors.full_messages }, status: :render_unprocessable_entity
    end

    def authorize
        @current_user = User.find_by(id: session[:user_id])
        render json: { errors: ["Not Authorized"] }, status: :unauthorized unless @current_user
    end

    # def hello_world
    #   session[:count] = (session[:count] || 0) + 1
    #   render json: { count: session[:count] }
    # end
end