class AddExtraFieldsToUser < ActiveRecord::Migration
  def change
    add_column :users, :phone_number, :string
    add_column :users, :address, :string
    add_column :users, :city, :string
  end
end
