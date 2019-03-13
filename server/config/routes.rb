Rails.application.routes.draw do
  
  namespace :admin do
    namespace :v1 do   
      resources :users
      post '/courses/:id/enroll', to: 'courses#enroll'
      delete '/courses/:id/drop', to: 'courses#drop'
      get '/courses/:id/enrolled', to: 'courses#enrolled_students'
      resources :courses do
        resources :problems
        post 'problems/:id', to: 'complete_problems#create'
        get 'problems/:id/status', to: 'complete_problems#status'
        get ':user_id/solution/:problem_id', to: 'course_progresses#show'
      end
    end
  end
end
