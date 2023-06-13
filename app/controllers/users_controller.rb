class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create] 
    
    # LOGIN
    def show
        render json: @current_user 
    end

    # SIGNUP
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id #logs in user
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end
