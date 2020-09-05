class Task < ApplicationRecord
	enum progress: { open: 0, start: 1, in_progress: 2, done: 3, close: 4 }
	enum priority: { important: 0, urgent: 1, important_and_urgent: 2 }

	validates :progress, presence: true

	validates :name, presence: true
	validate :check_for_words
  
  belongs_to :user

  def check_for_words
    if self.name.split.size > 40
       errors.add(:base, "You must have less than 40 words")
    end
	end

  def change_priority(data)
  	if priority.eql? data
  		nil
  	elsif priority.nil?
  		data == "urgent" ? Task.priorities[:urgent] : Task.priorities[:important]
  	elsif priority.eql? "important_and_urgent"
  		data == "urgent" ? Task.priorities[:important] : Task.priorities[:urgent]
		else
			Task.priorities[:important_and_urgent]
		end
	end

	class << self
		def next_stage(current_stage)
			case current_stage
			when "open"
				Task.progresses[:start]
			when "start"
				Task.progresses[:in_progress]
			when "in_progress"
				Task.progresses[:done]
			when "done"
				Task.progresses[:close]
			when "close"
				Task.progresses[:close]
			end
		end
	end
end

