Rails.application.routes.draw do
	resources :sessions, only: [:create] do
		collection do
			delete :logout, to: "sessions#logout"
			get :logged_in, to: "sessions#logged_in"
		end
	end

	resources :tasks, only: [:create, :index, :destroy, :update]

	resources :registrations, only: [:create] 
	root to: "static#home"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

