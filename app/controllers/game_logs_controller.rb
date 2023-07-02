class GameLogsController < ApplicationController
    def show
        game_log = GameLog.find(params[:id])
        render json: game_log
    end

    def create
        game_log = GameLog.create!(game_log_params)
        render json: game_log, status: :created
    end

    def update
        game_log = GameLog.find(params[:id])
        game_log.update!(game_log_params)
        render json: game_log, status: :accepted
    end

    private

    def game_log_params
        params.permit(:status, :rating, :date_started, :date_stopped, :date_completed, :play_time, :game_id, :user_id)
    end 

end
