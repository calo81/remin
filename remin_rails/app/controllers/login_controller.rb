class LoginController  < ApplicationController
  def create
    user = User.find_by_username_and_password(params[:username],params[:password])
    if !user
      render :json => {:error=>"User not found"}
    else
      session[:user]=user.id
      render :json => {:ok=>"User logged"}
    end
  end

  def index
    if session[:user]
       render :json => {:ok=>"in session"}
    else
       render :json => {:error=>"not logged"}
    end
  end

  def destroy
    session[:user]=nil
    render :json => {:ok=>"logged out"}
  end
end