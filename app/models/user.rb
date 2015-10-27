class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  self.inheritance_column = :user_type
  has_many :custom_components
  before_save :set_user_type

  def self.current=(user_obj)
    Thread.current[:user] = user_obj
  end

  def self.current
    Thread.current[:user]
  end

  def to_s
    first_name + last_name
  end

  private

   def set_user_type
     (self.user_type == nil)? self.user_type = "Admin" : self.user_type
   end

end
