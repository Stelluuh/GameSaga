class GamesController < ApplicationController

    def index
        render json: Game.all
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create
        game = Game.create!(game_create_params)
        render json: game, status: :created
    end

    def update
        game = Game.find(params[:id])
        game.update!(game_update_params)
        render json: game, status: :accepted
    end

    private

    def game_create_params
        params.permit(:cover, :name, :platform, :release_date, :involved_company, :player_perspective, :aggregated_rating, :aggregated_rating_count, :summary, :genre_id)
    end

    def game_update_params
        params.permit(:cover, :name, :platform, :genre_id)
    end

end
