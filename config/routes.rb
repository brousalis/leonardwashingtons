Leonards::Application.routes.draw do
  root :to => 'home#index'

  resources :slides
  resources :posts
  resources :newsletter
  resources :admin
  resources :shows
  resources :songs
  resources :contents

  match 'contact' => 'contact#new', :as => 'contact', :via => :get
  match 'contact' => 'contact#create', :as => 'contact', :via => :post
end
