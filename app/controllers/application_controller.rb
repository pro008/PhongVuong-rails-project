class ApplicationController < ActionController::Base
	# skip CSRF token
	skip_before_action :verify_authenticity_token
end
