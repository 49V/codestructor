Rails.application.routes.draw do
  namespace :admin do
    namespace :v1 do   
      resources :users
    end
  end
end
