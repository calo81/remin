class DocumentPersistence
  require "mongo"

  db = Mongo::Connection.new('82.165.139.7', 27017).db("#remin-#{Rails.env}")
  @@collection = db.collection("documents")

  def self.store(hash)
      @@collection.insert(hash)
  end

  def self.find_all
    @@collection.find.map{|doc| doc}
  end
end