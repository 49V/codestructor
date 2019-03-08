Rails.application.routes.draw do
  
  namespace :admin do
    namespace :v1 do   
      resources :users
      resources :courses do
        resources :problems
      end
    end
  end
end
