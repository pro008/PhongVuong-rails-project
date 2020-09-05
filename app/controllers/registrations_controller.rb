class RegistrationsController < ApplicationController
	def create
		user = User.create(
			user_name: params['user']['user_name'],
			password: params['user']['password'],
			password_confirmation: params['user']['password_confirmation']
		)

		if user
			session[:user_id] = user.id
			render json: {
				status: 200,
				message: "User has been created successfully",
				user: user
			}
		else
			render json: {status: 500, message: "Cannot create User"}
		end
		
	end
end
