Rails.application.routes.draw do
  root 'orders#index'
  resources :orders
  resources :statuses, only: [:index]
  resources :order_items, only: [:edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
