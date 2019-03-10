class Admin::V1::CompleteProblemsController < ApplicationController

  #POST /courses/:courses_id/problems/:id
  def create
    unless check_duplicate != 0
      @complete_problem = CompleteProblem.new(submit_params)
      if @complete_problem.save
        puts 'we gucci'
      end
    end
  end

  def check_duplicate
    dup = CompleteProblem.where(["problem_id = ? and user_id = ?", submit_params[:problem_id], submit_params[:user_id]]).size
  end
  private
  # Use callbacks to share common setup or constraints between actions.
  def submit_params
    params["user_id"] = @current_user.id
    params["problem_id"] = params[:id]
    params.except(:course_id, :id).permit(:user_id, :problem_id)
  end

end
