require 'httparty'
require 'json'

client_id = ENV['IGDB_CLIENT_ID']
authorization = ENV['IGDB_AUTHORIZATION']
limit = 500 # Maximum number of games to fetch per request
offset = 0 # Initial offset value

loop do
  response = HTTParty.post('https://api.igdb.com/v4/games/', headers: {
    'Client-ID' => client_id,
    'Authorization' => "Bearer #{authorization}",
    'Accept' => 'application/json'
  }, body: "fields aggregated_rating, aggregated_rating_count, cover.url, first_release_date, genres.name, involved_companies.company.name, name, platforms.name, player_perspectives.name, summary, total_rating, total_rating_count, artworks.url, screenshots.url, keywords.name; where genres != null & aggregated_rating > 70; limit #{limit}; offset #{offset};")

  games_data = JSON.parse(response.body)

  break if games_data.empty?

  games = games_data.map do |game|
    {
      name: game['name'],
      cover: game.dig('cover', 'url'),
      platform: game.dig('platforms', 0, 'name'),
      release_date: game['first_release_date'].to_i,
      involved_company: game.dig('involved_companies', 0, 'company', 'name'),
      player_perspective: game.dig('player_perspectives', 0, 'name'),
      aggregated_rating: game['aggregated_rating'].to_i,
      aggregated_rating_count: game['aggregated_rating_count'].to_i,
      summary: game['summary'],
      genre_attributes: { name: game.dig('genres', 0, 'name') },
      artworks: game.dig('artworks')&.map { |artwork| artwork['url'] } || [],
      screenshots: game.dig('screenshots')&.map { |screenshot| screenshot['url'] } || [],
      keywords: game.dig('keywords')&.map { |keyword| keyword['name'] } || []
    }
  end

  games.each do |game_data|
    genre_attributes = game_data.delete(:genre_attributes)
    genre = Genre.find_or_create_by!(genre_attributes)
    game = genre.games.build(game_data)

    # Additional conditional checks
    if game.valid?
      game.save!
    else
      puts "Skipping invalid game: #{game.name}"
      puts "Attributes causing the error:"
      puts game.errors.full_messages.inspect
      puts "Game data:"
      puts game_data.inspect
    end
  end

  offset += limit
end

puts 'Seeding Completed!'



#----------------- USE JSON DATA -----------------#
# require 'json'

# # Read the contents of the JSON file
# json_data = File.read('db/IGDB_data.json')
# data = JSON.parse(json_data)

# # Iterate over the data and create records
# data.each do |item|
#   name = item['name']
#   cover_url = item['cover']['url'] if item['cover']
#   release_date = Time.at(item['first_release_date']) if item['first_release_date']
#   involved_company = item['involved_companies']&.map { |company| company['company']['name'] }
#   player_perspective = item['player_perspectives']&.map { |perspective| perspective['name'] }
#   aggregated_rating = item['aggregated_rating'].to_i
#   aggregated_rating_count = item['aggregated_rating_count']
#   summary = item['summary']
#   genre_name = item['genres']&.first&.dig('name')
#   platform_names = item['platforms']&.map { |platform| platform['name'] }
#   artworks_urls = item['artworks']&.map { |artwork| artwork['url'] }
#   screenshots_urls = item['screenshots']&.map { |screenshot| screenshot['url'] }
#   keywords_names = item['keywords']&.map { |keyword| keyword['name'] }

#   # Find the genre by name or create a new one
#   genre = Genre.find_or_create_by(name: genre_name)

#   game = Game.create(
#     name: name,
#     cover: cover_url,
#     platform: platform_names,  
#     release_date: release_date,
#     involved_company: involved_company,
#     player_perspective: player_perspective,
#     aggregated_rating: aggregated_rating,
#     aggregated_rating_count: aggregated_rating_count,
#     summary: summary,
#     genre: genre,
#     artworks: artworks_urls,
#     screenshots: screenshots_urls,
#     keywords: keywords_names
#   )
# end

# puts 'Seeding Completed!'

