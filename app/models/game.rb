class Game < ApplicationRecord
  belongs_to :genre
  has_many :game_logs
  has_many :users, through: :game_logs
  

end

