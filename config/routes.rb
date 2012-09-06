Leonards::Application.routes.draw do
  root :to => 'home#index'

  resources :slides
  resources :posts
  resources :newsletter
  resources :admin
  resources :shows
  resources :songs
  resources :contents
end
