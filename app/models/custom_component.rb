class CustomComponent < ActiveRecord::Base
  require 'rubygems'
  require 'zip'
  has_attached_file :component,  :content_type => {:content_type => ["text/html"]}
  # validates_attachment_content_type :component, :content_type => { :content_type => ['text/html']}
  do_not_validate_attachment_file_type :component
  belongs_to :user
  validate :component_name_validation
  scope :user_scope, lambda{ where(["user_id in (?) and component_name <> ''", [User.current.created_user_id, User.current.id]])}
  scope :components_scope, lambda{|type| user_scope.joins(:user).where("users.user_type='Campaign' and component_type = '#{type}'")}
  scope :not_editable_components_scope, lambda{ user_scope.where("component_type = 'NotEditable'")}

  def self.create_component(file, name = nil, type)
    file_name = if User.current.user_type == 'Affiliate'
                  type == 'Editable' ? file : NokogiriParser.new(file, type).parser
                else
                  file
                end
    # file_name = NokogiriParser.new(file, type).parser
    self.create!(component: File.open(file_name), component_name: name, user: User.current, component_type: type)
  end

  def self.update_component(file, name = nil, type)
    @res = CustomComponent.where(user_id: User.current.id, component_type: type).first
    file_name = (type == 'Editable' ? file : NokogiriParser.new(file, type).parser)
    @res.update_attributes!(component: File.open(file_name), component_name: name, user: User.current, component_type: type)
    @res
  end

  def component_name_validation
    if (User.current.user_type == 'Campaign' && self.component_name == "")
      self.errors.add(:component_name, "Name can't be blank")
    end
  end

  def self.mak_zip_file
    file = File.open("example.html", 'r').path
    css_file = "#{Rails::root}/app/assets/stylesheets/contents.css"
    js_file =  "#{Rails::root}/app/assets/javascripts/js/scripts.js"
    input_filenames = [file, css_file, js_file]
    zipfile_name = "tmp/zip#{Time.now.strftime('%d%m%Y%s')}.zip"
    Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
      input_filenames.each do |filename|
        zipfile.add(filename.sub('/', ''), filename)
      end
      zipfile.get_output_stream("myFile") { |os| os.write "myFile contains just this" }
    end
    zip_data = File.read(zipfile_name)
    [zip_data, zipfile_name]
  end
end