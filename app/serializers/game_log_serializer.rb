class GameLogSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :game_id, :status, :rating, :date_started, :date_stopped, :date_completed, :play_time

  belongs_to :user
  belongs_to :game
end
