class Game < ApplicationRecord
  belongs_to :genre
  has_many :game_logs
  has_many :users, through: :game_logs


  validates :name, presence: true
  validates :aggregated_rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :aggregated_rating_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :summary, presence: true

end
