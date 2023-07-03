class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :cover
      t.string :name
      t.string :platforms
      t.integer :release_date
      t.string :involved_company
      t.string :player_perspective
      t.integer :aggregated_rating
      t.integer :aggregated_rating_count
      t.string :summary
      t.references :genre, null: false, foreign_key: true

      t.timestamps
    end
  end
end
