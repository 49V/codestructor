class Admin::V1::CoursesController < ApplicationController
  before_action :set_course, only: [:show, :update, :destroy]

  # GET /courses
  def index
    if @current_user.teacher
      courses = @current_user.created_courses
      render json: courses
    else
      owned_courses = @current_user.courses      
      unowned_courses = Course.joins(:students).where("courses_users.user_id != ?", @current_user.id)
      render json: { owned: owned_courses, unowned: unowned_courses }
    end
  end

  # GET /courses/1
  def show
    render json: @course
  end

  # POST /courses
  def create
    if @current_user.teacher
      @course = Course.new(course_params)
      @course.teacher_id = @current_user.id
      if @course.save
        render json: @course
      else
        render json: @course.errors
      end
    end
  end

  # PATCH/PUT /courses/1
  def update
    if @course.update(course_params)
      render json: @course
    else
      render json: @course.errors, status: :unprocessable_entity
    end
  end

  # DELETE /courses/1
  def destroy
    @course.destroy if(@current_user.teacher) 
  end

  def enroll
    debugger;
    # if !@current_user.teacher
    #   @current_user.courses << @course
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_course
      @course = Course.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def course_params
      params.require(:course).permit(:name, :description, :teacher_id)
    end
end
