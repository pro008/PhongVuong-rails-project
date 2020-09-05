class TasksController < ApplicationController
	include CurrentUserConcern
	before_action :load_task, only: %i[update destroy]

	def index
		if @current_user
			tasks = @current_user.tasks

			render json:{ tasks: tasks }
		else
			render json:{
				status: 400
			}
		end
	end

	def update
		@task.update(progress: Task.next_stage(params[:progress])) if params[:progress].present?
		@task.update(priority: @task.change_priority(params[:priority])) if params[:priority].present?
		@task.reload

		render json:{ task: @task }
	end

	def create
		@task = @current_user.tasks.new(task_params)
	
		if (@task.save)
			render json:{ status: 200, task: @task}
		else
			render json:{ status:400 }
		end
	end

	def destroy
		@task.destroy

		render json:{ status: 200 }
	end

	private

	def load_task
    @task = @current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :priority, :progress)
  end
end