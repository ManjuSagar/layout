class AddUserTypeColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string, :null => false
    add_column :users, :last_name, :string, :null => false
    add_column :users, :user_type, :string, :null => false
    add_column :users, :created_user_id, :integer
  end
end
