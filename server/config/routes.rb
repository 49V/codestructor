Rails.application.routes.draw do
  
  namespace :admin do
    namespace :v1 do   
      resources :users
      post '/courses/:id/enroll', to: 'courses#enroll'
      delete '/courses/:id/drop', to: 'courses#drop'
      resources :courses do
        resources :problems
        post 'problems/:id', to: 'complete_problems#create'
      end
    end
  end
end
