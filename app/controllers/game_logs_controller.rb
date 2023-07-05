class GameLogsController < ApplicationController
    def show
        game_log = @current_user.game_logs.find(params[:id])
        render json: game_log
    end

    def create
        game_log = @current_user.game_logs.create!(game_log_params)
        render json: game_log, status: :created
    end

    def update
        game_log = @current_user.game_logs.find(params[:id])
        game_log.update!(game_log_params)
        render json: game_log, status: :accepted
    end

    def destroy
        game_log = @current_user.game_logs.find(params[:id])
        game_log.destroy
        head :no_content, status: :deleted
    end

    private

    def game_log_params
        params.permit(:status, :rating, :date_started, :date_stopped, :date_completed, :play_time, :game_id, :user_id)
    end 

end
