class DocumentController < ApplicationController
  def index
    render :json => DocumentPersistence.find_all(session[:user])
  end
  def create
    DocumentPersistence.store(params.merge({:user_id=>session[:user]}))
    render :json => {:ok => "document stored"}
  end
end