class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :avatar, :bio, :total_games_played, :favorite_genre, :hours_played, :user_id
  # belongs_to :user
end
