class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create] 
    

    def show
        render json: @current_user
    end

    #sign up
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id #logs in user
        render json: user, status: :created
    end

    private

    def find_user
        user = User.find_by(id: params[:id])
    end

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end
end
