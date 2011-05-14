require "spec_helper"

describe "User" do
  it "should create a user with user and password, is saved on DB" do
    user=User.new :username => "carlo", :password => "xxx"
    User.should_receive(:find_by_username).and_return(nil)
    user.register
    user.id.should_not be nil
  end

  it "should raise error if existent user" do
    user=User.new :username => "carlo", :password => "xxx"
    User.should_receive(:find_by_username).and_return(double("user"))
    lambda{user.register}.should raise_error(RuntimeError)
  end
end