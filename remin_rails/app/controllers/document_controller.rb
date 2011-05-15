class DocumentController < ApplicationController
  def index
    render :json => DocumentPersistence.find_all
  end
  def create
    DocumentPersistence.store(params)
    render :json => {:ok => "document stored"}
  end
end