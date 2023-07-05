class GameSerializer < ActiveModel::Serializer
  attributes :id, :cover, :name, :platforms, :release_date, :involved_company, :player_perspective, :aggregated_rating, :aggregated_rating_count, :summary, :artworks, :screenshots, :keywords, :genre_id, :genre, :summary, :websites, :game_logs

  belongs_to :genre
end
