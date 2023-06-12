require 'json'

# Read the contents of the JSON file
json_data = File.read('db/IGDB_data.json')

# Parse the JSON data
data = JSON.parse(json_data)

# Iterate over the data and create records
data.each do |item|
  # Extract relevant attributes
  name = item['name']
  cover_url = item['cover']['url'] if item['cover']
  release_date = Time.at(item['first_release_date']) if item['first_release_date']
  involved_company = item['involved_companies']&.map { |company| company['company']['name'] }
  player_perspective = item['player_perspectives']&.map { |perspective| perspective['name'] }
  aggregated_rating = item['aggregated_rating']
  aggregated_rating_count = item['aggregated_rating_count']
  summary = item['summary']
  genre_name = item['genres']&.first&.dig('name')
  platform_names = item['platforms']&.map { |platform| platform['name'] }


  # Find the genre by name or create a new one
  genre = Genre.find_or_create_by(name: genre_name)

  # Create a record using the extracted attributes
  Game.create(
    name: name,
    cover: cover_url,
    platform: platform_names,  # Update the platform attribute
    release_date: release_date,
    involved_company: involved_company,
    player_perspective: player_perspective,
    aggregated_rating: aggregated_rating,
    aggregated_rating_count: aggregated_rating_count,
    summary: summary,
    genre: genre
  )
end

puts 'Seeding Completed!'