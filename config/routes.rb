Rails.application.routes.draw do
  resources :library_games

  resources :profiles, only: [:index, :create, :show, :update]
  resources :games, only: [:index, :show]
  resources :game_logs, only: [:create, :show, :update, :destroy]
  resources :genres, only: [:index]
  resources :users, only: [:index, :show, :create, :update, :destroy]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/users', to: 'users#index'
end
