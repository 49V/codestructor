class Admin::V1::CompleteProblemsController < ApplicationController

  #POST /courses/:courses_id/problems/:id
  def create
    unless check_duplicate != 0
      @complete_problem = CompleteProblem.new(submit_params)
      if @complete_problem.save
        puts 'we gucci'
        # TO DO!!!!!!!
      end
    end
    CourseProgress.new(progress_params) unless has_progress?
  end

  def has_progress?
    CourseProgress.where(["problem_id = ? and user_id = ?", submit_params[:problem_id], submit_params[:user_id]]).size > 0  
  end

  def status
    render json: has_completed?
  end

  def check_duplicate
    dup = CompleteProblem.where(["problem_id = ? and user_id = ?", submit_params[:problem_id], submit_params[:user_id]]).size
  end
  private
  # Use callbacks to share common setup or constraints between actions.

  def has_completed?
    CompleteProblem.where("user_id=? and problem_id=?", @current_user[:id], params[:id]).size > 0
  end

  def submit_params
    params["user_id"] = @current_user.id
    params["problem_id"] = params[:id]
    params.except(:course_id, :id, :solution, :complete_problem).permit(:user_id, :problem_id)
  end

  def progress_params
    params["user_id"] = @current_user.id
    params["problem_id"] = params[:id]
    params.except(:id, :complete_problem).permit(:user_id, :problem_id, :course_id, :solution)
  end

end
