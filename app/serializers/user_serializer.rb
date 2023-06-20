class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile
  has_one :profile
  has_many :game_logs
  has_many :games, through: :game_logs
end
