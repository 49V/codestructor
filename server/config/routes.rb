Rails.application.routes.draw do
  
  namespace :admin do
    namespace :v1 do   
      resources :users
      post '/courses/:id/enroll', to: 'courses#enroll'
      resources :courses do
        resources :problems
      end
    end
  end
end
