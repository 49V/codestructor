class Admin::V1::CourseProgressesController < ApplicationController

  #GET /courses/:course_id/:id/solution/:user_id
  def show
    # debugger
    solution = CourseProgress.where(["problem_id = ? and user_id = ?", params[:problem_id], params[:user_id]])
    render json: solution
  end

end
