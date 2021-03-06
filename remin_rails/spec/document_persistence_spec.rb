require "spec_helper"
require "mongo"

describe "DocumentPersistence" do
  before(:each) do
    db = Mongo::Connection.new('82.165.139.7', 27017).db("#remin-#{Rails.env}")
    @collection = db.collection("documents")
    @collection.remove
  end
  it "should save the collection and the document when no existent" do
    DocumentPersistence.store(:category => "cat1", :name=>"el nombre")
    document = @collection.find_one({:category => "cat1"})
    document.should_not be_nil
    document['category'].should == "cat1"
    document['name'].should =="el nombre"
  end

   it "should return all the documents when queried for the user id" do
    DocumentPersistence.store(:category => "cat1", :name=>"el nombre",:user_id=>"uid")
    DocumentPersistence.store(:category => "cat2", :name=>"el nombre2",:user_id=>"uid")
    documents = DocumentPersistence.find_all("uid")
    documents.size.should == 2
   end

   it "should return nothing  when queried for the wrong user id" do
    DocumentPersistence.store(:category => "cat1", :name=>"el nombre",:user_id=>"uid")
    DocumentPersistence.store(:category => "cat2", :name=>"el nombre2",:user_id=>"uid")
    documents = DocumentPersistence.find_all("uid_wrong")
    documents.size.should == 0
  end
end