class RegistrationController < ApplicationController
  def create
    user = User.new
    user.username =  params["username"]
    user.password = params[:password]
    begin
      user.register
      session[:user] = user.id
      render :json => {:ok => "User registered and logged"}
    rescue RuntimeError => error
      render :json => {:error => error.message}
    end
  end
end