class AddAttributesToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :artworks, :string
    add_column :games, :screenshots, :string
    add_column :games, :keywords, :string
  end
end
