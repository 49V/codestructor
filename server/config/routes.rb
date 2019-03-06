Rails.application.routes.draw do
  resources :problems
  resources :courses
  namespace :admin do
    namespace :v1 do   
      resources :users
      resources :courses
      resources :problems
    end
  end
end
