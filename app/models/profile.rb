class Profile < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :age, numericality: { only_integer: true, greater_than: 0 }
  validates :avatar, presence: true
  validates :bio, length: { maximum: 500 }
  validates :total_games_played, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :total_hours_played, numericality: { greater_than_or_equal_to: 0 }
end
