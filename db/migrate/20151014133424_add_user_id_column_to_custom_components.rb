class AddUserIdColumnToCustomComponents < ActiveRecord::Migration
  def change
    add_column :custom_components, :user_id, :integer, :default => 0
  end
end
