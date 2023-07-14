class GamesController < ApplicationController


    def index
        games = Game.all
        # games = Game.all.includes(:game_logs)
        render json: games

    end

    def show
        game = Game.find(params[:id])
        render json: game
    end


    private


end
