class Game < ApplicationRecord
  belongs_to :genre
  has_many :game_logs, dependent: :destroy
  has_many :users, through: :game_logs
  

end

