Rails.application.routes.draw do
  resources :problems
  resources :courses
  namespace :admin do
    namespace :v1 do   
      resources :users
    end
  end
end
