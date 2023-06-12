Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :profiles, only: [:create, :show, :update, :destroy]
  resources :games, only: [:index, :create, :show, :destroy]
  resources :game_logs, only: [:show, :update, :destroy]
  resources :genre, only: [:index]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  # get '/hello', to: 'application#hello_world'
end
