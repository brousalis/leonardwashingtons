Leonards::Application.routes.draw do
  root :to => 'home#index'

  resources :posts
  resources :newsletter
  resources :admin
end
