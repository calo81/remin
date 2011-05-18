class LoginController  < ApplicationController
  def create
    user = User.find_by_username_and_password(params[:username],params[:password])
    if !user
      render :json => {:error=>"User not found"}
    else
      session[:user]=user
      render :json => {:ok=>"User logged"}
    end
  end

  def index
    if session[:user]
      return render :json => {:ok=>"in session"}
    else
      return render :json => {:error=>"not logged"}
    end
  end
end