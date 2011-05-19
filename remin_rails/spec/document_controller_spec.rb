require "spec_helper"

describe "DocumentController" do
  before(:each) do
    @controller = DocumentController.new
    @controller.params={}
    @controller.request = Object.new
    @controller.request.instance_eval do
      @user = Object.new


      def session
        @map ||={:user=>"user_id"}
      end
    end
  end

  it "should return all the documents on index for the user" do
    DocumentPersistence.should_receive(:find_all).with("user_id").and_return [{:category=>"cat1", :name=>"nam1"}, {:category=>"cat2", :name=>"nam2"}]
    @controller.should_receive(:render).with(:json => [{:category=>"cat1", :name=>"nam1"}, {:category=>"cat2", :name=>"nam2"}])
    @controller.index
  end

  it "should save a document" do
    DocumentPersistence.should_receive(:store).with({:user_id=>"user_id"})
    @controller.should_receive(:render).with(:json => {:ok => "document stored"})
    @controller.create
  end
end