class GamesController < ApplicationController


    def index
        games = Game.all.includes(:game_logs)
        render json: games

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
        params.permit(:cover, :name, :platforms, :release_date, :involved_company, :player_perspective, :aggregated_rating, :aggregated_rating_count, :summary, :genre_id)
    end

    def game_update_params
        params.permit(:cover, :name, :platforms, :genre_id)
    end

end
