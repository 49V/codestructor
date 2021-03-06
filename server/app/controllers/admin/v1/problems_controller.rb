class Admin::V1::ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy]

  # GET /courses/:courses_id/problems
  def index
    @problems = Problem.where(course_id: params[:course_id])
    render json: @problems
  end

  # GET /:courses_id/problems/1
  def show
    render json: @problem
  end

  # POST /:courses_id/problems
  def create
    @problem = Problem.new(problem_params)

    if @problem.save
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /:courses_id/problems/1
  def update
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /:courses_id/problems/1
  def destroy
    @problem.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_problem
      @problem = Problem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.require(:problem).permit(:course_id, :statement, :description, :solution, :references)
    end
end
