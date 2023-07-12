class User < ApplicationRecord
    has_one :profile, dependent: :destroy
    has_many :game_logs
    has_many :games, through: :game_logs

    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, :password_confirmation, presence: true, length: { minimum: 8 }
end
