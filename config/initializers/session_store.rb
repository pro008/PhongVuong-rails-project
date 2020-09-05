# What cookie going to be structure like
# params: 1st -> key: name of session cookie


if Rails.env == "production"
	Rails.application.config.session_store :cookie_store, key: "_authentication_app", domain: "http://domain.com"
else
	Rails.application.config.session_store :cookie_store, key: "_authentication_app"
end
