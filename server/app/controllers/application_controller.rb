class ApplicationController < ActionController::API
  before_action :set_user_id

  # Set's the userID based upon the authentication header so we can keep track of what user is logged in
  def set_user_id
    @current_user = User.find(request.headers["UserID"]);  
  end

end
