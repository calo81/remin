class DocumentController < ApplicationController
  def index
    render :json => DocumentPersistence.find_all(session[:user].id)
  end
  def create
    DocumentPersistence.store(params.merge({:user_id=>session[:user].id}))
    render :json => {:ok => "document stored"}
  end
end