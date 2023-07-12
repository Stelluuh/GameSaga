class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create, :index] 
    
    def index
        users = User.all
        render json: users
    end


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

    # deletes account
    def destroy
        @current_user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end
end
