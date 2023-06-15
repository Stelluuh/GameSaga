# require 'httparty'
# require 'json'

# client_id = ENV['IGDB_CLIENT_ID']
# authorization = ENV['IGDB_AUTHORIZATION']

# response = HTTParty.get('https://api.igdb.com/v4/games/', headers: {
#   'Client-ID' => client_id,
#   'Authorization' => "Bearer #{authorization}",
#   'Accept' => 'application/json'
# }, body: 'fields aggregated_rating, aggregated_rating_count, cover.url, first_release_date, genres.name, involved_companies.company.name, name, platforms.name, player_perspectives.name, rating, rating_count, summary, total_rating, total_rating_count;')

# games_data = JSON.parse(response.body)

# games = games_data.map do |game|
#   {
#     name: game['name'],
#     cover: game['cover']['url'],
#     platform: game['platforms'][0]['name'], 
#     release_date: game['first_release_date'],
#     involved_company: game['involved_companies'][0]['company']['name'], 
#     player_perspective: game['player_perspectives'][0]['name'],
#     aggregated_rating: game['aggregated_rating'],
#     aggregated_rating_count: game['aggregated_rating_count'],
#     summary: game['summary'],
#     genre: game['genres'][0]['name']
#   }
# end

# games.each do |game_data|
#   Game.create(game_data)
# end
