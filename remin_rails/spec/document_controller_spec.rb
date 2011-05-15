require "spec_helper"

describe "DocumentController" do
  before(:each) do
    @controller = DocumentController.new
    @controller.params={}
  end

  it "should return all the documents on index" do
    DocumentPersistence.should_receive(:find_all).and_return [{:category=>"cat1",:name=>"nam1"},{:category=>"cat2",:name=>"nam2"}]
    @controller.should_receive(:render).with(:json => [{:category=>"cat1",:name=>"nam1"},{:category=>"cat2",:name=>"nam2"}])
    @controller.index
  end

   it "should save a document" do
    DocumentPersistence.should_receive(:store)
    @controller.should_receive(:render).with(:json => {:ok => "document stored"})
    @controller.create
  end
end