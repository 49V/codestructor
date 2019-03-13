class Admin::V1::CourseProgressesController < ApplicationController

  #GET /courses/:id/:problem_id/solution/:user_id
  def show
    solution = CourseProgress.where(["problem_id = ? and user_id = ?", params[:id], params[:user_id]])
    render json: solution
  end

  private
    def accept_params

    end

end
