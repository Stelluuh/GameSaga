class Profile < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :age, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  validates :avatar, presence: true
  validates :bio, length: { maximum: 500 }
  # validates :favorite_genre, presence: true
end
