require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "Task" do
  	let(:me) { User.create(user_name: "phongvuong", password: "Kakalot009") }
  	subject { Task.new(name: 'Task 1', priority: 1, progress: 1, user_id: 1) }

  	it "create tasks over 40 words" do
      subject.name = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      expect(subject).to_not be_valid
    end

    it "create tasks without progress" do
      subject.progress = nil
      expect(subject).to_not be_valid
    end
  end
end
