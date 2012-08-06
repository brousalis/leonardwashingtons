Leonards::Application.routes.draw do
  root :to => 'home#index'

  resources :slides
  resources :posts
  resources :newsletter
  resources :admin
end
