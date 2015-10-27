class AddUserIdToCustomComponents < ActiveRecord::Migration
  def change
    add_column :custom_components, :user_id, :integer, :null => false
  end
end
