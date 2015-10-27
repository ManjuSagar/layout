# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

unless (User.find_by_email("admin@gmail.com").present?)
  @u = User.new
  @u.email = "admin@gmail.com"
  @u.first_name = "Manju"
  @u.last_name = "Sagar"
  @u.password = "test1234"
  @u.user_type = "Admin"
  @u.save
end

