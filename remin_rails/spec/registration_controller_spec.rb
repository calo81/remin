require "spec_helper"

describe "RegistrationController" do

  before(:each) do
    @controller = RegistrationController.new
    @controller.params = {:username=>"carlo", :password =>"pass"}
    @controller.request = Object.new
    @controller.request.instance_eval do
      def session
        @map ||={}
      end
    end
  end

  context "not yet registerd"
  it "should registrate and login" do
        user = User.new :username=>"carlo", :password=>"pass", :id=>"1"
        User.should_receive(:new).and_return(user)
        user.should_receive(:register).and_return(true)
        @controller.should_receive(:render).with({:json=>{:ok=>"User registered and logged"}})
        @controller.create
        @controller.session.should include(:user=>user)
  end

  context "already registerd"
  it "should return error message" do
        user = User.new :username=>"carlo", :password=>"pass", :id=>"1"
        User.should_receive(:new).and_return(user)
        user.should_receive(:register).and_raise(RuntimeError.new("Error creando"))
        @controller.should_receive(:render).with({:json=>{:error=>"Error creando"}})
        @controller.create
        @controller.session.should_not include("1"=>user)
  end
end