class AddComponentTypeColumnToComponentsTable < ActiveRecord::Migration
  def change
    add_column :custom_components, :component_type, :string
  end
end
