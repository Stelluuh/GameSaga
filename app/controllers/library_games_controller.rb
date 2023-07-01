class LibraryGamesController < ApplicationController
    before_action :authorize

    def index
        library_games = @current_user.library_games
        render.json: library_games
    end

    def show
        render.json: @library_games
    end

    def create
        library_game = @current_user.library_games.create!(library_game_params)
        render json: library_game, status: :created
    end

    def update
        @library_game.update!(library_game_params)
        render json: @library_game, status: :accepted
    end

    def destroy
        @library_game.destroy
        head :no_content
    end

    private

    def library_game_params
        params.permit(:status)
    end
end
