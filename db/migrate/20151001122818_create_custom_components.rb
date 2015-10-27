class CreateCustomComponents < ActiveRecord::Migration
  def change
    create_table :custom_components do |t|
      t.has_attached_file :component
      t.string :component_name, :null => false
      t.timestamps
    end
  end
end
