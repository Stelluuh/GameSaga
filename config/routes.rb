Rails.application.routes.draw do

  resources :profiles, only: [:index, :create, :show, :update]
  resources :games, only: [:index, :create, :show, :update]
  resources :game_logs, only: [:show, :update, :destroy]
  resources :genres, only: [:index, :show, :create]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/users', to: 'users#index'
end
