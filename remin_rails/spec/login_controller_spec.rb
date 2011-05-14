require "spec_helper"

describe LoginController do

  before(:each) do
    @controller = LoginController.new
    @controller.params = {:username=>"carlo", :password =>"pass"}
    @controller.request = Object.new
    @controller.request.instance_eval do
      def session
        @map ||={}
      end
    end
  end

  context "when user no found" do
    it "should return an error" do
      User.should_receive(:find_by_username_and_password).with("carlo", "pass").and_return(nil)
      @controller.should_receive(:render).with({:json=>{:error=>"User not found"}})
      @controller.create
    end

    context "when user found" do
      it "create user session" do
        user = User.new :username=>"carlo", :password=>"pass", :id=>"1"
        User.should_receive(:find_by_username_and_password).with("carlo", "pass").and_return(user)
        @controller.should_receive(:render).with({:json=>{:ok=>"User logged"}})
        @controller.create
        @controller.session.should include(:user=>user)
      end
    end
  end
end