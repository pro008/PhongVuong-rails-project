class User < ApplicationRecord
	has_secure_password

	validates :user_name, uniqueness: true, presence: true, length: { minimum: 4, maximum: 16 }
	validates :user_name, format: { with: /\A[a-zA-Z0-9 ]+\Z/, message: 'Should not contain special characters'}
	validates :password, presence: true, length: { minimum: 8, maximum: 16 }
	validates :password, format: { with: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, message: 'Should contain at least 1 upper-case, 1 lower-case and 1 number'}


	has_many :tasks, dependent: :destroy
end
