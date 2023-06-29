require 'httparty'
require 'json'

client_id = ENV['IGDB_CLIENT_ID']
authorization = ENV['IGDB_AUTHORIZATION']
limit = 500 # Maximum number of games to fetch per request
offset = 0 # Initial offset value

def screenshot_url(hash)
  "https://images.igdb.com/igdb/image/upload/t_screenshot_med/#{hash}.jpg"
end

loop do
  response = HTTParty.post('https://api.igdb.com/v4/games/', headers: {
    'Client-ID' => client_id,
    'Authorization' => "Bearer #{authorization}",
    'Accept' => 'application/json'
  }, body: "fields aggregated_rating, aggregated_rating_count, cover.url, first_release_date, genres.name, involved_companies.company.name, name, platforms.name, player_perspectives.name, summary, artworks.url, screenshots.url, keywords.name, websites.url; where genres != null & aggregated_rating > 79; limit #{limit}; offset #{offset};")

  if response.code == 200
    games_data = JSON.parse(response.body)
    break if games_data.empty?

    games = games_data.map do |game|
      screenshots = game.dig('screenshots')&.map { |screenshot| screenshot['url'] } || []
      screenshot_hashes = screenshots.map { |url| url.split('/').last.split('.').first }
      medium_screenshots = screenshot_hashes.map { |hash| screenshot_url(hash) }

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
        screenshots: medium_screenshots,
        keywords: game.dig('keywords')&.map { |keyword| keyword['name'] } || [],
        websites: { url: game.dig('websites', 0, 'url') }
      }
    end

    games.each do |game_data|
      genre_attributes = game_data.delete(:genre_attributes)
      genre = Genre.find_or_create_by!(genre_attributes)
      game = genre.games.build(game_data)

      if game.valid?
        game.save!
      else
        puts "Skipping invalid game: #{game.name}"
      end
    end

    offset += limit
  else
    # Stop the loop if the response is not 200. This fixes DEPLOYMENT ISSUE.
    puts "Error: #{response.code}"
    puts response.body
    break
  end
end

puts 'Seeding Completed!'
