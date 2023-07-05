class ProfilesController < ApplicationController

    before_action :authorize
    before_action :find_profile, only: [:show, :update]

    def index
        profiles = Profile.all
        render json: profiles
    end

    def create
        profile = @current_user.build_profile(profile_params) 
        #build_profile comes from the has_one relationship in the User model
        if profile.save
            render json: profile, status: :created
        else
            render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        render json: @current_user.profile
    end

    def update
        @profile.update!(profile_params)
        render json: @profile, status: :accepted
    end


    private

    def profile_params
        params.permit(:name, :age, :avatar, :bio, :total_games_played, :favorite_genre, :hours_played)
    end

    def find_profile
        @profile = @current_user.profile
    end

end
