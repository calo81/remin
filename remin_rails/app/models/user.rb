class User
  include MongoMapper::Document
  include ActiveModel::Serializers::JSON
  self.include_root_in_json = false

  key :username, String, :required => true
  key :password, String, :required => true

  def register
    if !User.find_by_username(self.username)
      return self.save
    else
      raise "User already registered"
    end
  end
end